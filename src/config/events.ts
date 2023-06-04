// date format: d MMM yyyy, H:mm, time should be specifed based on UTC time

export type EventData = {
  id: string;
  title: string;
  isActive?: boolean;
  validTill: string;
  bodyText: string;
  buttons: {
    text: string;
    link: string;
    newTab: boolean;
  }[];
};

export const homeEventsData: EventData[] = [
];

export const appEventsData: EventData[] = [
   {
    id: "position-router-updates",
    title: "Position Router Updates",
    isActive: true,
    validTill: "19 Oct 2022, 20:00",
    bodyText: "Position routers have been updated, existing users may have to re-enable leverage.",
    buttons: [
      {
        text: "Read More",
        link: "https://zomifinance.medium.com//gmx-deployment-updates-a6a470df445f",
        newTab: true,
      },
    ],
  },
];
