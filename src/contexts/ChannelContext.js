import fetch from 'node-fetch';
import { useState, createContext, useEffect } from 'react' ;

export const ChannelContext = createContext();

const ChannelProvider = (props) => {

   const [channels, setChannels ] = useState(null) ;
   const [ channelById, setChannelById ] = useState(null) ;
   const [ schedule, setSchedule] = useState(null);
   const [ programsByChannel, setProgramsByChannel ] = useState(null);

    useEffect( ()=>{
        getAllChannels();
    },[]);

   

    const getAllChannels = async () => {
        
        let data = await fetch("/api/v1/channels");
        data = await data.json();
        setChannels(data.channels);
    }

    const getChannelById = async (channelId) => {
        
        let data = await fetch(`/api/v1/channels/${channelId}`);
        data = await data.json();
        setChannelById(data.channel);
    }

    const getChannelsSchedule = async (channelId) => {

        let data = await fetch(`/api/v1/channels/schedule/${channelId}`);
        data = await data.json();
        setSchedule(data);

    }

    const getChannelsPrograms = async (channelId) => {
        let data = await fetch(`/api/v1/channels/programs/${channelId}`);
        data = await data.json();
        setProgramsByChannel(data)

    }

   const values = {channels, 
                    getAllChannels, 
                    getChannelById, 
                    channelById, 
                    schedule, 
                    getChannelsSchedule,
                    programsByChannel,
                    setProgramsByChannel,
                    getChannelsPrograms
                }

   return (
    <ChannelContext.Provider value={values}>
        {props.children}
    </ChannelContext.Provider>
    );

};

export default ChannelProvider ;