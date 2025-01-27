"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, EventClickArg, DateSelectArg } from "@fullcalendar/core";

const BookingPage = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setNewEvent({
      id: "",
      title: "",
      description: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setShowPopup(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { id, title, extendedProps, startStr, endStr } = clickInfo.event;
    setNewEvent({
      id: id ?? "",
      title: title ?? "",
      description: extendedProps.description ?? "",
      start: startStr,
      end: endStr,
    });
    setShowPopup(true);
  };

  const handleAddOrUpdateEvent = () => {
    if (newEvent.id) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === newEvent.id
            ? {
                ...event,
                title: newEvent.title,
                description: newEvent.description,
                start: newEvent.start,
                end: newEvent.end,
              }
            : event
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          title: newEvent.title,
          description: newEvent.description,
          start: newEvent.start,
          end: newEvent.end,
        },
      ]);
    }
    setShowPopup(false);
    setNewEvent({ id: "", title: "", description: "", start: "", end: "" });
  };

  const handleDeleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== newEvent.id)
    );
    setShowPopup(false);
    setNewEvent({ id: "", title: "", description: "", start: "", end: "" });
  };

  const handleCancel = () => {
    setShowPopup(false);
    setNewEvent({ id: "", title: "", description: "", start: "", end: "" });
  };

  return (
    <div className="booking-container">
      <div className="calendar-card">
        <h1 className="calendar-header">Booking Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable
          selectable
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="80vh"
        />
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="popup-header">
              {newEvent.id ? "Edit Event" : "Add Event"}
            </h2>
            <label className="popup-label">Event Name:</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="popup-input"
            />
            <label className="popup-label">Event Description:</label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="popup-input"
            />
            <label className="popup-label">Start Time:</label>
            <input
              type="time"
              value={newEvent.start}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
              className="popup-input"
            />
            <label className="popup-label">End Time:</label>
            <input
              type="time"
              value={newEvent.end}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: e.target.value })
              }
              className="popup-input"
            />
            <div className="button-group">
              <button onClick={handleAddOrUpdateEvent} className="add-button">
                {newEvent.id ? "Update Event" : "Add Event"}
              </button>
              {newEvent.id && (
                <button onClick={handleDeleteEvent} className="delete-button">
                  Delete Event
                </button>
              )}
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .booking-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(90deg, #007bff, #0056b3);
          font-family: "Arial", sans-serif;
        }

        .calendar-card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          width: 80%;
        }

        .calendar-header {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
          color: #007bff;
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          padding: 30px;
          z-index: 1000;
          width: 400px;
        }

        .popup-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .popup-header {
          font-size: 20px;
          font-weight: bold;
          color: #007bff;
          text-align: center;
        }

        .popup-label {
          font-size: 14px;
          font-weight: bold;
          color: #555555;
        }

        .popup-input {
          padding: 10px;
          border: 1px solid #cccccc;
          border-radius: 6px;
          font-size: 14px;
          width: 100%;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 20px;
        }

        .add-button,
        .delete-button,
        .cancel-button {
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
        }

        .add-button {
          background-color: #007bff;
          color: white;
        }

        .delete-button {
          background-color: #f33;
          color: white;
        }

        .cancel-button {
          background-color: #6c757d;
          color: white;
        }

        .add-button:hover {
          background-color: #0056b3;
        }

        .delete-button:hover {
          background-color: #c00;
        }

        .cancel-button:hover {
          background-color: #5a6268;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
