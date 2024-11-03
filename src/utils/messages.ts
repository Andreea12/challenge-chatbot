import { ControlOption, Message } from "../types";

export const INITIAL_MESSAGE: Message = {
  id: `${Date.now()}`,
  speaker: "bot",
  text: "Hello! Welcome to the LSEG chatbot. I'm here to help you",
};

export const LOADING_MESSAGE: Message = {
  id: `bot-${Date.now()}`,
  speaker: "bot",
  text: "Please wait while data is loading...",
};

export const ERROR_MESSAGE: Omit<Message, "id"> = {
  speaker: "bot",
  text: "Oops! There was an error loading the data. Please try again later.",
};

export const MENU_OPTION: ControlOption = {
  code: "menu",
  text: "Main Menu",
};

export const BACK_OPTION: ControlOption = {
  code: "back",
  text: "Go Back",
};
