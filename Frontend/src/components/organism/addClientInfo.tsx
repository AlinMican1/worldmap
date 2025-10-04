"use client";
import BoxDesign from "../atoms/boxDesign";
import "../../app/globals.css";
import { InputField } from "../atoms/inputField";
import { ErrorMessageProps, ClientInfoProps, AddClientInfoProps } from "@/types/interfaces";
import { SubmitClientSchedule } from "@/REST/POST";
import { SubmitAddParticipant } from "@/REST/POST";
import EnterLocation from "../molecule/enterLocation";
import useErrors from "@/hooks/useErrors";
import useClientForm from "@/hooks/useClientForm";
import CalendarBox from "../molecule/calendarBox";
import useArray from "@/hooks/useArray";
import ChooseTime from "../molecule/chooseTime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateAndTimeContext } from "@/contexts";
import DateAndTimeDisplay from "../molecule/dateAndTimeDisplay";
import Button from "../atoms/button";
import Title from "../atoms/title";
import UsersIcon from "../icons/users";
import NotesIcon from "../icons/notes";
import Modal from "../atoms/modal";
import ArrowRightIcon from "../icons/arrowRight";
import ExitIcon from "../icons/exit";
import ClientList from "../molecule/clientList";
import { GetParticipants } from "@/REST/GET";
import SelectedParticipants from "../molecule/selectedParticipants";
import PariticipantsPreview from "../molecule/participantsPreview";
import EarthIcon from "../icons/earth";
import { getTimezones } from "../../../helper/SuggestLocation";
import { COUNTRIES } from "../../../helper/SuggestLocation";

const AddClientInfo = ({ clients, setClients }: AddClientInfoProps) => {
  //Custom hooks
  const form = useClientForm({
    first_name: "",
    surname: "",
    email: "",
    location: "",
    timezone: "",
    // dates: new Map<string, string[]>(),
  });
  const errorsHook = useErrors();
  const dateArray = useArray<string>([]);
  const [time, setTime] = useState<string>("");
  const [dateAndTimeMap, setDateAndTimeMap] = useState<Map<string, string[]>>(new Map());
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  //Get current width box for SelectedParticipants box.
  useEffect(() => {
    if (boxRef.current) {
      setParentWidth(boxRef.current.clientWidth);
    }
  }, []);

  const timezonesArr = useArray<string>([]);
  useEffect(() => {
    if (COUNTRIES[form.formData.location]) {
      timezonesArr.setArray(getTimezones(form.formData.location));
    } else [timezonesArr.clear()];
  }, [form.formData.location]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await GetParticipants("6efe07f7-cbf5-4481-8045-347ec1cf26b4");
        if (!response) {
          return;
        }
        response.forEach((person: ClientInfoProps) => {
          setClients((oldArray) => [
            ...oldArray,
            {
              first_name: person.first_name,
              email: person.email,
              location: person.location,
              surname: person.surname,
              timezone: person.timezone,
            },
          ]);
        });
      } catch (error) {}
    };
    loadData();
  }, []);
  // Use for context
  const dateAndTime = useMemo(
    () => ({
      dateArray,
      time,
      setTime,
      dateAndTimeMap,
      setDateAndTimeMap,
    }),
    [dateArray, time, dateAndTimeMap]
  );

  //Memoization
  const setLocation = useCallback(
    (newLocation: string) => form.setFormData((prev) => ({ ...prev, location: newLocation })),
    [form.setFormData]
  );
  const CalendarBoxMemo = useMemo(() => <CalendarBox />, [dateArray.array]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getErrors = await SubmitClientSchedule(clients);

    if (getErrors.errors && getErrors.success === false) {
      const filteredErrors = getErrors.errors.filter(
        (err: ErrorMessageProps) => err.error === true
      );
      errorsHook.setErrors(filteredErrors);
    } else if (clients.length !== 0) {
      errorsHook.clearErrors();
      setClients([]);
      form.resetFormData();
      dateAndTimeMap.clear();
    }
  };

  const handleAddClients = async (e: React.MouseEvent<HTMLButtonElement>, close: () => void) => {
    e.preventDefault();

    const client = {
      first_name: form.formData.first_name,
      location: form.formData.location,
      email: form.formData.email,
      surname: form.formData.surname,
      timezone: form.formData.timezone || timezonesArr.array[0],
    };

    const response = await SubmitAddParticipant(client);
    if (response.errors.length > 0) {
      errorsHook.setErrors(response.errors);
    } else {
      setClients((oldArray) => [...oldArray, client]);
      form.resetFormData();
      errorsHook.clearErrors();
      close();
    }
  };

  return (
    <div>
      <Title
        title="Schedule New Meeting"
        subheading="Create a meeting that works for everyone worldwide"
      />
      <form id="client-form" onSubmit={handleSubmit}>
        <div className="elements-row">
          <BoxDesign centeredY="leftY" centeredX="leftX" variant="sixth-DesignBox">
            <Title
              variant="secondary"
              title="Meeting Details"
              icon={<NotesIcon className="title-icon" size="24" />}
            />
            <DateAndTimeContext.Provider value={dateAndTime}>
              <div className="elements-row">
                {CalendarBoxMemo}
                <ChooseTime />
              </div>
              <DateAndTimeDisplay />
            </DateAndTimeContext.Provider>
          </BoxDesign>
          {/* <BoxDesign variant="sixth-DesignBox" centeredX="leftX" centeredY="leftY">
            <Title
              title="TimeZone Preview"
              variant="secondary"
              icon={<EarthIcon className="title-icon" size="28" />}
            />
            <PariticipantsPreview
              clients={clients}
              setClients={setClients}
              parentWidth={parentWidth}
            />
          </BoxDesign> */}
        </div>
        <BoxDesign centeredY="leftY" centeredX="leftX" variant="sixth-DesignBox" ref={boxRef}>
          <Title
            title="Select Participants"
            variant="secondary"
            icon={<UsersIcon className="title-icon" size="28" />}
          />

          <SelectedParticipants
            clients={clients}
            setClients={setClients}
            parentWidth={parentWidth}
          />
          <ClientList clients={clients} setClients={setClients} />

          <Modal
            trigger={(open) => (
              <Button onClick={open}>
                {" "}
                Add A New Participant <ArrowRightIcon className="" />{" "}
              </Button>
            )}
          >
            {(close) => (
              <BoxDesign
                variant="third-DesignBox"
                centeredX="leftX"
                centeredY="leftY"
                padding="large"
              >
                <Title variant="primary" title="Add New Participant" />
                <div className="elements-row">
                  <InputField
                    autocomplete="off"
                    type="text"
                    name="first_name"
                    label="Person's Name"
                    value={form.formData.first_name}
                    id="first_name"
                    onChange={form.handleChange}
                    placeholder="Enter Client Name"
                    error={errorsHook.getErrorBoolean("name")}
                    errorMsg={errorsHook.getErrorMsg("name")}
                  />
                  <InputField
                    autocomplete="off"
                    type="text"
                    name="email"
                    label="Person's Email"
                    value={form.formData.email}
                    id="email"
                    onChange={form.handleChange}
                    placeholder="Enter Client Email"
                    error={errorsHook.getErrorBoolean("email")}
                    errorMsg={errorsHook.getErrorMsg("email")}
                  />
                  <InputField
                    autocomplete="off"
                    type="text"
                    name="surname"
                    label="Participant Surname"
                    value={form.formData.surname}
                    id="participant"
                    onChange={form.handleChange}
                    placeholder="Enter Pariticipant Surname"
                    error={errorsHook.getErrorBoolean("surname")}
                    errorMsg={errorsHook.getErrorMsg("surname")}
                  />
                </div>
                <div className="elements-row">
                  <EnterLocation
                    location={form.formData.location}
                    setLocation={setLocation}
                    errorMsg={errorsHook.getErrorMsg("location")}
                    error={errorsHook.getErrorBoolean("location")}
                  />
                  <div>
                    {timezonesArr.array.length > 0 && (
                      <div>
                        <label htmlFor="timezone">Choose a timezone:</label>
                        <select
                          name="timezone"
                          id="timezone"
                          value={form.formData.timezone || timezonesArr.array[0]}
                          onChange={(e) =>
                            form.setFormData((prev) => ({ ...prev, timezone: e.target.value }))
                          }
                        >
                          {timezonesArr.array.map((timezone, idx) => (
                            <option key={idx} value={timezone}>
                              {timezone}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="close-btn-pos">
                  <button className="close-btn" onClick={() => (close(), form.resetFormData())}>
                    <ExitIcon className={"exit-icon"} />
                  </button>
                </div>
                <Button
                  type="button"
                  variant="secondary-btn"
                  onClick={(e) => handleAddClients(e, close)}
                >
                  Add Clients
                </Button>
              </BoxDesign>
            )}
          </Modal>
        </BoxDesign>
      </form>

      <BoxDesign padding="none" centeredX="leftX" centeredY="leftY" variant="fifth-DesignBox">
        <Button type="submit" form="client-form" variant="secondary-btn">
          Submit All Clients
        </Button>
        {errorsHook.getErrorBoolean("noClient") ? (
          <p className="error-msg">{errorsHook.getErrorMsg("noClient")}</p>
        ) : (
          ""
        )}
      </BoxDesign>
    </div>
  );
};
export default AddClientInfo;
