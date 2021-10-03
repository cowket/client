import React from 'react';

type ChannelContextType = {
  channelList: Channel[];
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
};

const initialValue: ChannelContextType = {
  channelList: [],
  setChannelList: () => undefined,
};

const channelContext = React.createContext<ChannelContextType>(initialValue);

export default channelContext;
