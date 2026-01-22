import { TimezoneGroup } from "@/types/interfaces";
import BoxDesign from "@/components/atoms/boxDesign";
import "./sortItems.css";
import { useSortable } from "@dnd-kit/sortable";
import TimezoneParticipantChip from "./timezoneParticipantChip";
import { CSS } from "@dnd-kit/utilities";

export const SortableTimezone = ({ group, order }: { group: TimezoneGroup; order: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: group.timezone,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <BoxDesign
      ref={setNodeRef}
      variant="seventh-DesignBox"
      className="sortable-timezone"
      style={style}
      data-dragging={isDragging}
      {...attributes}
      {...listeners}
      centeredX="leftX"
      padding="small"
    >
      {/* Order badge */}
      <span className="timezone-order-badge" aria-label={`Priority ${order}`}>
        {order}
      </span>

      {/* Header */}
      <div className="rotation-header">
        <div className="row-input-elem-timezone">
          <div className="top-item-gap">
            <h3 className="timezone-text">{group.timezone}</h3>
            <span className="participant-span-details">
              <span className="participant-count">
                {group.participantCount} {group.participantCount === 1 ? "person" : "people"}
              </span>
            </span>
          </div>
          <span className="participant-span-details local-time">{"12:30"}</span>
        </div>
      </div>

      {/* Participants */}
      <div className="rotation-participants-row">
        {group.participants.map((p) => (
          <TimezoneParticipantChip key={p.email} participant={p} />
        ))}
      </div>
    </BoxDesign>
  );
};
