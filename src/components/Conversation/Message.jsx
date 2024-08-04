import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  Timeline,
  TextMsg,
  MediaMsg,
  DocMsg,
  ReplyMsg,
  LinkMsg,
} from "./MsgTypes";

const Message = ({menu}) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, idx) => {
          // Generate a unique key for each element
          const key = el.id || idx;  // Prefer `el.id` if available, otherwise fall back to `idx`

          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline key={key} el={el} menu={menu}/>
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg key={key} el={el} menu={menu}/>
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg key={key} el={el} menu={menu}/>
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg key={key} el={el} menu={menu}/>
                  );

                case "reply":
                  return (
                    //  Reply Message
                    <ReplyMsg key={key} el={el} menu={menu}/>
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg key={key} el={el} menu={menu}/>
                  );
              }

            default:
              return null;  // Better to return null than an empty fragment
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
