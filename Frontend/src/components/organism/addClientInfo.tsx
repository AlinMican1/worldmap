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
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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

const AddClientInfo = ({ clients, setClients }: AddClientInfoProps) => {
  //Custom hooks
  const form = useClientForm({
    first_name: "",
    surname: "",
    email: "",
    location: "",
    // dates: new Map<string, string[]>(),
  });
  const errorsHook = useErrors();
  const dateArray = useArray<string>([]);
  const [time, setTime] = useState<string>("");
  const [dateAndTimeMap, setDateAndTimeMap] = useState<Map<string, string[]>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      const response = await GetParticipants("6efe07f7-cbf5-4481-8045-347ec1cf26b4");
      response.forEach((person: ClientInfoProps) => {
        setClients((oldArray) => [
          ...oldArray,
          {
            first_name: person.first_name,
            email: person.email,
            location: person.location,
            surname: person.surname,
          },
        ]);
      });
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

  // useEffect(() => {
  //   setClients((oldArray) => [
  //     ...oldArray,
  //     {
  //       first_name: "zz",
  //       email: "mmm@mm.com",
  //       location: "United Kingdom",
  //       surname: "VV",
  //     },
  //   ]);
  // }, []);

  const handleAddClients = async (e: React.MouseEvent<HTMLButtonElement>, close: () => void) => {
    e.preventDefault();

    const client = {
      first_name: form.formData.first_name,
      location: form.formData.location,
      email: form.formData.email,
      surname: form.formData.surname,
    };

    const response = await SubmitAddParticipant(client);
    if (response.errors.length > 0) {
      errorsHook.setErrors(response.errors);
    } else {
      setClients((oldArray) => [...oldArray, client]);
      form.resetFormData();
      errorsHook.clearErrors();
      close();
      console.log(response);
    }
    // Add the dates into the clientForm so that we can get errors.
    // const readyFormData = {
    //   ...form.formData,
    //   // dates: new Map(dateAndTimeMap),
    // };
    // const getErrors = await GetFormErrors(true, readyFormData);
    // const filteredErrors = getErrors.filter((err: ErrorMessageProps) => err.error === true);
    // if (filteredErrors.length > 0) {
    //   errorsHook.setErrors(filteredErrors);
    // } else {
    //   form.resetFormData();
    //   errorsHook.clearErrors();
    //   setClients((oldArray) => [...oldArray, readyFormData]);
    //   dateAndTimeMap.clear();
    //   close();
    // }
  };

  return (
    <div>
      <Title
        title="Schedule New Meeting"
        subheading="Create a meeting that works for everyone worldwide"
      />
      <form id="client-form" onSubmit={handleSubmit}>
        <BoxDesign centered="left" variant="sixth-DesignBox">
          <Title
            variant="secondary"
            title="Meeting Details"
            icon={<NotesIcon className="title-icon" />}
          />
          <DateAndTimeContext.Provider value={dateAndTime}>
            <div className="elements-row">
              {CalendarBoxMemo}
              <ChooseTime />
            </div>
            <DateAndTimeDisplay />
          </DateAndTimeContext.Provider>
        </BoxDesign>

        <BoxDesign centered="left" variant="sixth-DesignBox">
          <Title
            title="Select Participants"
            variant="secondary"
            icon={<UsersIcon className="title-icon" />}
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
              <BoxDesign variant="third-DesignBox" centered="left" padding="large">
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
                <EnterLocation
                  location={form.formData.location}
                  setLocation={setLocation}
                  errorMsg={errorsHook.getErrorMsg("location")}
                  error={errorsHook.getErrorBoolean("location")}
                />
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

          {/* <div className="elements-row">
            <InputField
              autocomplete="off"
              type="text"
              name="name"
              label="Person's Name"
              value={form.formData.name}
              id="name"
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
          </div>
          <EnterLocation
            location={form.formData.location}
            setLocation={setLocation}
            errorMsg={errorsHook.getErrorMsg("location")}
            error={errorsHook.getErrorBoolean("location")}
          /> */}
        </BoxDesign>
      </form>
      {/* <BoxDesign>
        <form id="client-form" onSubmit={handleSubmit}>
          
          <div className="elements-row">
            <InputField
              autocomplete="off"
              type="text"
              name="name"
              label="Person's Name"
              value={form.formData.name}
              id="name"
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
          </div>

          <EnterLocation
            location={form.formData.location}
            setLocation={setLocation}
            errorMsg={errorsHook.getErrorMsg("location")}
            error={errorsHook.getErrorBoolean("location")}
          />
          <DateAndTimeContext.Provider value={dateAndTime}>
           
            <div className="elements-row">
              {CalendarBoxMemo}
              <ChooseTime />
            </div>
            <DateAndTimeDisplay />
          </DateAndTimeContext.Provider>
          <BoxDesign padding="none" centered="left">
            <Button type="button" onClick={handleAddClients} variant="secondary-btn">
              Add Client
            </Button>
            {dateAndTimeMap.size === 0 && errorsHook.getErrorBoolean("date") ? (
              <p className="error-msg">{errorsHook.getErrorMsg("date")}</p>
            ) : (
              ""
            )}
          </BoxDesign>
        </form>
      </BoxDesign> */}

      <BoxDesign padding="none" centered="left" variant="fifth-DesignBox">
        <Button type="submit" form="client-form" variant="secondary-btn">
          Submit All Clients
        </Button>
        {errorsHook.getErrorBoolean("noClient") ? (
          <p className="error-msg">{errorsHook.getErrorMsg("noClient")}</p>
        ) : (
          ""
        )}
      </BoxDesign>
      <p></p>
    </div>
  );
};
export default AddClientInfo;
