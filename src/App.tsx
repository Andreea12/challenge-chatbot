import { Box, styled } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { MessageItem } from "./MessageItem";
import { Exchange, isExchange, isStock, Message, Option } from "./types";
import {
  BACK_OPTION,
  ERROR_MESSAGE,
  INITIAL_MESSAGE,
  LOADING_MESSAGE,
  MENU_OPTION,
} from "./utils/messages";
import { useGetDataHook } from "./utils/useGetDataHook";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    INITIAL_MESSAGE,
    LOADING_MESSAGE,
  ]);
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );
  const lastMessage = useRef<string>();

  const { data, isLoading, error } = useGetDataHook();

  useEffect(() => {
    if (!isLoading && error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...ERROR_MESSAGE,
          id: `bot-${Date.now()}`,
        },
      ]);
    } else if (!isLoading && !lastMessage.current && data?.length) {
      const id = `bot-${Date.now()}`;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id,
          speaker: "bot",
          text: "Please select a Stock Exchange",
          options: data,
        },
      ]);
      lastMessage.current = id;
    }
  }, [data, isLoading, error]);

  const createNewUserMessage = (option: Option) => {
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      speaker: "user",
      text: "",
    };
    if (isExchange(option)) {
      newUserMessage.text = option.stockExchange;
    } else if (isStock(option)) {
      newUserMessage.text = option.stockName;
    } else {
      newUserMessage.text = option.text;
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  };

  const createNewBotMessage = (option: Option) => {
    const id = `bot-${Date.now()}`;
    const newBotMessage: Message = {
      id,
      speaker: "bot",
      text: "",
    };
    if (isExchange(option)) {
      if (option.topStocks.length) {
        newBotMessage.text = "Please select a stock";
        newBotMessage.options = option.topStocks;
      } else {
        newBotMessage.text = "No stocks available for this exchange";
        newBotMessage.options = [MENU_OPTION];
      }
      setSelectedExchange(option);
    } else if (isStock(option)) {
      newBotMessage.text = `Stock price of ${option.stockName} is ${option.price}. Please select an option`;
      newBotMessage.options = [MENU_OPTION, BACK_OPTION];
    } else if (option.code === "menu") {
      newBotMessage.text = "Please select a Stock Exchange";
      newBotMessage.options = data;
      setSelectedExchange(null);
    } else if (option.code === "back" && selectedExchange) {
      newBotMessage.text = "Please select a stock";
      newBotMessage.options = selectedExchange.topStocks;
      setSelectedExchange(null);
    }

    lastMessage.current = id;
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

  const optionHandler = (option: Option) => () => {
    createNewUserMessage(option);
    createNewBotMessage(option);
  };

  const renderMessage = (message: Message) => {
    const isClickable = lastMessage.current === message.id;
    return (
      <MessageItem
        {...message}
        key={message.id}
        isClickable={isClickable}
        optionHandler={optionHandler}
      />
    );
  };

  return (
    <Chat>
      <Header>LSEG chatbot</Header>
      <ListView>{messages.map(renderMessage)}</ListView>
    </Chat>
  );
};

const Chat = styled(Stack)({
  height: "calc(100vh - 48px)",
  margin: "24px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  overflow: "hidden",
});

const Header = styled(Box)({
  backgroundColor: "blue",
  color: "white",
  padding: "16px",
  borderRadius: "8px 8px 0px 0px",
  zIndex: 10,
});

const ListView = styled(Stack)({
  position: "relative",
  overflow: "auto",
});

export default App;
