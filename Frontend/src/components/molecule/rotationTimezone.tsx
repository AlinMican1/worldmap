"use client";

import { useEffect, useMemo, useState } from "react";
import { ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import Title from "../atoms/title";
import DashboardIcon from "../icons/dashboard";
import "./rotationTimezone.css";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface TimezoneGroup {
  timezone: string;
  location: string;
  participants: ClientInfoProps[];
  participantCount: number;
}

interface RotationTimezoneProps {
  clients: ClientInfoProps[];
  rotationOrder: string[];
  setRotationOrder: React.Dispatch<React.SetStateAction<string[]>>;
  meetingTime: string;
  rotationalFreq: string;
}

/* ---------------- Sortable Item ---------------- */

const SortableTimezone = ({ group }: { group: TimezoneGroup }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: group.timezone,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div className="vik">
      <BoxDesign
        variant="previewTime-DesignBox"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        centeredX="leftX"
      >
        <div className="rotation-header">
          <div className="rotation-timezone">
            <span className="timezone-icon">🌍</span>
            <strong className="timezone-text">{group.timezone}</strong>
          </div>
          <span className="participant-badge">
            {group.participantCount} {group.participantCount === 1 ? "member" : "members"}
          </span>
        </div>

        <div className="rotation-participants">
          {group.participants.map((p) => (
            <div key={p.email} className="rotation-participant">
              <div className="participant-info">
                <span className="participant-name">
                  {p.first_name} {p.surname}
                </span>
                <span className="participant-location">{p.location}</span>
              </div>
            </div>
          ))}
        </div>
      </BoxDesign>
    </div>
  );
};

/* ---------------- Main Component ---------------- */

const RotationTimezone = ({
  clients,
  rotationOrder,
  setRotationOrder,
  rotationalFreq,
}: RotationTimezoneProps) => {
  const [timezoneGroups, setTimezoneGroups] = useState<TimezoneGroup[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    const selectedClients = clients.filter((c) => c.selected);
    const map = new Map<string, ClientInfoProps[]>();

    selectedClients.forEach((client) => {
      if (!map.has(client.timezone)) {
        map.set(client.timezone, []);
      }
      map.get(client.timezone)!.push(client);
    });

    const groups: TimezoneGroup[] = Array.from(map.entries()).map(([timezone, participants]) => ({
      timezone,
      location: participants[0].location,
      participants,
      participantCount: participants.length,
    }));

    setTimezoneGroups(groups);

    setRotationOrder((prev) => {
      if (prev.length > 0) return prev;
      return groups.map((g) => g.timezone);
    });
  }, [clients, setRotationOrder]);

  const allOrderedGroups = useMemo(() => {
    const ordered = rotationOrder
      .map((tz) => timezoneGroups.find((g) => g.timezone === tz))
      .filter(Boolean) as TimezoneGroup[];

    const missing = timezoneGroups.filter((g) => !rotationOrder.includes(g.timezone));

    return [...ordered, ...missing];
  }, [rotationOrder, timezoneGroups]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setRotationOrder((items) => {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (timezoneGroups.length === 0) {
    return (
      <BoxDesign variant="sixth-DesignBox">
        <Title
          title="Rotation Order"
          variant="secondary"
          icon={<DashboardIcon className="title-icon" />}
        />
        <p className="rotation-empty-state">
          No participants selected. Please select participants to set up rotation.
        </p>
      </BoxDesign>
    );
  }

  return (
    <BoxDesign variant="sixth-DesignBox">
      <Title
        title="Rotation Order by Timezone"
        variant="secondary"
        icon={<DashboardIcon className="title-icon" />}
      />

      <p className="rotation-description">
        Drag to reorder timezones. The meeting time rotates every{" "}
        <strong>{rotationalFreq?.toLowerCase()}</strong>.
      </p>

      <DndContext
        sensors={sensors}
        onDragStart={(e: { active: { id: string } }) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={allOrderedGroups.map((g) => g.timezone)}
          strategy={verticalListSortingStrategy}
        >
          <div className="rotation-list">
            {allOrderedGroups.map((group) => (
              <SortableTimezone key={group.timezone} group={group} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId ? <div className="rotation-item rotation-item--overlay">{activeId}</div> : null}
        </DragOverlay>
      </DndContext>
    </BoxDesign>
  );
};

export default RotationTimezone;
