import { Box, styled } from "@mui/material";
import { useEffect, useRef } from "react";
import { isExchange, isStock, Message } from "./types";

type MessageItemProps = Message & {
  isClickable: boolean;
  optionHandler: (option: any) => () => void;
};

export const MessageItem = ({
  id,
  text,
  speaker,
  options,
  isClickable,
  optionHandler,
}: MessageItemProps) => {
  const itemRef = useRef<HTMLDivElement>();

  useEffect(() => {
    itemRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (speaker === "user") {
    return <RightMessage key={id}>{text}</RightMessage>;
  }

  return (
    <LeftMessage key={id} ref={itemRef}>
      {text}
      {options?.map((item) => (
        <MessageOption
          key={`${id}-${item.code}`}
          onClick={isClickable ? optionHandler(item) : undefined}
          style={{
            cursor: isClickable ? "pointer" : "unset",
          }}
        >
          {isExchange(item)
            ? item.stockExchange
            : isStock(item)
            ? item.stockName
            : item.text}
        </MessageOption>
      ))}
    </LeftMessage>
  );
};

const LeftMessage = styled(Box)({
  backgroundColor: "lightblue",
  maxWidth: "50%",
  margin: "8px 18px",
  padding: "16px",
  borderRadius: "8px",
});

const RightMessage = styled(Box)({
  backgroundColor: "lightgreen",
  maxWidth: "50%",
  margin: "8px 18px",
  padding: "16px",
  borderRadius: "8px",
  alignSelf: "flex-end",
});

const MessageOption = styled(Box)({
  backgroundColor: "white",
  marginTop: "8px",
  padding: "8px",
  borderRadius: "8px",
});
