"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

type NotificationSection = "push" | "lesson" | "live" | "general";

type NotificationSettings = {
  push: {
    pushNotification: boolean;
    emailNotification: boolean;
  };
  lesson: {
    lessonProgress: boolean;
    newLesson: boolean;
    reminder: boolean;
    recommendation: boolean;
  };
  live: {
    eventAnnouncements: boolean;
  };
  general: {
    systemUpdates: boolean;
    feedbackRequests: boolean;
  };
};

type NotificationKey<T extends NotificationSection> = keyof NotificationSettings[T];

const SwitchToggle = ({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-start justify-between">
    <div>
      <p className="font-normal text-sm text-black">{label}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`w-8 h-4 flex items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-4" : ""
        }`}
      />
    </button>
  </div>
);

const NotificationRow = ({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div onClick={onClick} className="cursor-pointer group py-2 space-y-1">
    <div className="flex items-center gap-1">
      <p className={`text-sm font-semibold ${active ? "text-black" : "text-gray-700"}`}>
        {label}
      </p>
      <ChevronRight
        className={`transition duration-200 ${
          active ? "text-black" : "text-gray-400 group-hover:text-black"
        }`}
        size={16}
      />
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const ProfileNotification = () => {
  const [activeSection, setActiveSection] = useState<NotificationSection>("push");

  const [notifications, setNotifications] = useState<NotificationSettings>({
    push: {
      pushNotification: true,
      emailNotification: true,
    },
    lesson: {
      lessonProgress: true,
      newLesson: false,
      reminder: false,
      recommendation: false,
    },
    live: {
      eventAnnouncements: true,
    },
    general: {
      systemUpdates: true,
      feedbackRequests: true,
    },
  });

  const toggle = <T extends NotificationSection>(
    section: T,
    key: NotificationKey<T>
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  return (
    <div className="max-w-9xl mx-auto px-4 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/3 space-y-4 text-sm text-black">
        <NotificationRow
          label="Push Notifications"
          description="Control alerts for new activities and updates."
          active={activeSection === "push"}
          onClick={() => setActiveSection("push")}
        />
        <NotificationRow
          label="Lesson Notifications"
          description="Receive notifications about your lesson progress."
          active={activeSection === "lesson"}
          onClick={() => setActiveSection("lesson")}
        />
        <NotificationRow
          label="Live & Special Events"
          description="Get notified about special events, fasts, or prayer meetings."
          active={activeSection === "live"}
          onClick={() => setActiveSection("live")}
        />
        <NotificationRow
          label="General Notifications"
          description="Manage announcements and feedback requests."
          active={activeSection === "general"}
          onClick={() => setActiveSection("general")}
        />
      </div>

      <div className="max-w-100 md:w-2/3 space-y-6">
        {activeSection === "push" && (
          <>
            <h1 className="text-lg font-semibold">Push Notifications</h1>
            <SwitchToggle
              label="Allow Push Notification"
              description=""
              enabled={notifications.push.pushNotification}
              onToggle={() => toggle("push", "pushNotification")}
            />
            <SwitchToggle
              label="Email Notification"
              description="Get notifications on your email"
              enabled={notifications.push.emailNotification}
              onToggle={() => toggle("push", "emailNotification")}
            />
          </>
        )}

        {activeSection === "lesson" && (
          <>
            <h1 className="text-lg font-semibold">Lesson Notifications</h1>
            <SwitchToggle
              label="Allow Lesson Notifications"
              description=""
              enabled={notifications.lesson.lessonProgress}
              onToggle={() => toggle("lesson", "lessonProgress")}
            />
            <SwitchToggle
              label="New Lesson Published"
              description="Be the first to know when a lesson is available"
              enabled={notifications.lesson.newLesson}
              onToggle={() => toggle("lesson", "newLesson")}
            />
            <SwitchToggle
              label="Lesson Reminder"
              description="Remind me to complete my lesson."
              enabled={notifications.lesson.reminder}
              onToggle={() => toggle("lesson", "reminder")}
            />
            <SwitchToggle
              label="Lesson Recommendation"
              description="Get personalized suggestions based on your progress"
              enabled={notifications.lesson.recommendation}
              onToggle={() => toggle("lesson", "recommendation")}
            />
          </>
        )}

        {activeSection === "live" && (
          <>
            <h1 className="text-lg font-semibold">Live & Special Events</h1>
            <SwitchToggle
              label="Event Announcements"
              description="Get notified about special events, fasts, or prayer meetings."
              enabled={notifications.live.eventAnnouncements}
              onToggle={() => toggle("live", "eventAnnouncements")}
            />
          </>
        )}

        {activeSection === "general" && (
          <>
            <h1 className="text-lg font-semibold">General Notifications</h1>
            <SwitchToggle
              label="System Announcements & Updates"
              description="Stay informed about major changes, features, or downtime."
              enabled={notifications.general.systemUpdates}
              onToggle={() => toggle("general", "systemUpdates")}
            />
            <SwitchToggle
              label="Surveys & Feedback Requests"
              description="Help us improve your experience with occasional feedback prompts."
              enabled={notifications.general.feedbackRequests}
              onToggle={() => toggle("general", "feedbackRequests")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileNotification;
