"use client";
import { SortableTimezone } from "../molecule/sortItems";
import { useEffect, useMemo, useState } from "react";
import { ClientInfoProps } from "@/types/interfaces";
import BoxDesign from "../atoms/boxDesign";
import Title from "../atoms/title";
import DashboardIcon from "../icons/dashboard";
import "./rotationTimezone.css";
import { TimezoneGroup } from "@/types/interfaces";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

interface RotationTimezoneProps {
  clients: ClientInfoProps[];
  rotationOrder: string[];
  setRotationOrder: React.Dispatch<React.SetStateAction<string[]>>;
  meetingTime: string;
  rotationalFreq: string;
}

/* ---------------- Main Component ---------------- */

const RotationTimezone = ({
  clients,
  rotationOrder,
  setRotationOrder,
  rotationalFreq,
}: RotationTimezoneProps) => {
  const [timezoneGroups, setTimezoneGroups] = useState<TimezoneGroup[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

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
      const next = [...prev];

      groups.forEach((g) => {
        if (!next.includes(g.timezone)) {
          next.push(g.timezone);
        }
      });

      return next.filter((tz) => groups.some((g) => g.timezone === tz));
    });
  }, [clients, setRotationOrder]);

  /* Map for fast lookup */
  const groupMap = useMemo(() => {
    return new Map(timezoneGroups.map((g) => [g.timezone, g]));
  }, [timezoneGroups]);

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
    <BoxDesign centeredY="leftY" centeredX="leftX" variant="sixth-DesignBox">
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
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="rotation-participants-wrapper">
          <SortableContext items={rotationOrder} strategy={verticalListSortingStrategy}>
            {rotationOrder.map((tz, index) => {
              const group = groupMap.get(tz);
              if (!group) return null;

              return (
                <SortableTimezone
                  key={tz}
                  group={group}
                  order={index + 1} // 👈 1-based order
                />
              );
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? <div className="rotation-item rotation-item--overlay">{activeId}</div> : null}
        </DragOverlay>
      </DndContext>
    </BoxDesign>
  );
};

export default RotationTimezone;
