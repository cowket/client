import React from 'react';
import { useHistory } from 'react-router-dom';
import Team from 'components/Chat/List/Team';
import Channel from 'components/Chat/List/Channel';
import './style.scss';

const ListBox = () => {
  const history = useHistory();
  const teamList: { teamName: string; id: number; img: string }[] = [
    {
      teamName: '카카오',
      id: 1,
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAnFBMVEX/3AAAAB//4gD/4AD/5AD/3gD/4QAABh8ACB//5gAABx8AAB792gARFB8ACx99bRhcUhnKrwxzZRfewAkeHh0HDh+kjxLuzgXStgtZTxrDqQ4oJh331QOqlBGBcRa9pA9pXRiMehU8NxwbHB4TFh5QRxpJQhu4nxCOfBU1MRzy0QavmBGXgxR4aRgxLRxAOhskIx3jxAhsXxhNRRpm5ptnAAAD50lEQVR4nO3Y2XajOhAFUJekAmSDZwbbGI/xnMHJ///bLQk7nYdOnnqgc89+sTFZLA4llURaLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4f2Ctvzz9p+7jt+HT9Px5RG3y+A/ezG+herQ2n53UxYxO/3oVVRXtPk+4ICq/QcK3756w/fBVws4/n9D07gl/JHn/pvcUfoOE4cQnDE7KfXBgLGurfC5J2K0Tqrrfsg6UUR96r6w1uuGPQBL2XcJgQHO5VS7P/Q7R+OCDBedO6r+YYeHyay6yqncp1C2U1qPFfnAyjc5oHn1CnafJJuaW6pPTCZ/kwCVMXEKTEQ10S0/H/iz164FsBkd/+Fh+uWn4y8wwXJoW83PSzeU+9XQ5zctTRuFKihbMQxc7KChdusdQ0PNqPpeH0HNlN2dKx71Dn7ovTZ6s5tUltI8RDQJ3zEozs626T66GWTiOmU9JsvZV46tSQWBXqVtD+ErJJDbK3vI3lSR8NVINyj7epB74hbBOqHd1fVu3Lss5UaFlBqdJPUnnIV2bW0SzDId2ROGjvf3AWiklv/iEl/ZLy/ZCKoL730uBdWtDC0nYSSv/VLhMoyz46dWbwPTDXrxNJveer8r9papWw8QlVJf2LJD6nm/1ZWXy0eg6GktCqWS4rytrnru95g5TMwmrnLb3hGZed0sak+usl+gpps3R1ieZLxt/ckNTWSh8f62vEQ2bndAuqF2PUj0lWl3LspRPl/AQPRlZ9Vf1EFYTWRmy8znzCQs/G/01+u3HBid8CytlL7dOYx6ioZWpJuv/LeFR29VtmMouNRrZIFDxVqrHP2pod1GTR+nOrXxmkrpuwjwjP7ekl3ZcwlW01hw8JDTSbpPe6bticpm4hCVF83qBaY27B/V3Y3zBrkO5O45n21RWBEk4l/Vf2yy6J5Tc5Xi7kRdh89rx002XqauePSYP9dAu3qvZRPbYvsjz17J8r5lNPz3mgS5eadN1Cavo2e1lRpTsApYxO2Ml7bSfuBnomuzCSon1Oplxc9dD+0J+hCl52a2Uy0Kzrnzd1gnD3W1/Fg5d90zW2UXazYvvMfqtS4fRdbFOm1xCaSbVwt+eXQ1lRqlil3Zeele7HvuEnWffQmyPLnJ4rvfd+dIn5LjeplO4aG6fEer+uqcDN9K0KU/aMCt3xHFZ76k5LlwIle/n+9zIO5P//xSrolouX7OyuRuan/o4pfh+wO9vwG5rwPcdkFbGmKC5cxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfrn/ADCaOc2HgoxfAAAAAElFTkSuQmCC',
    },
    {
      teamName: '다음',
      id: 2,
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAnFBMVEX/3AAAAB//4gD/4AD/5AD/3gD/4QAABh8ACB//5gAABx8AAB792gARFB8ACx99bRhcUhnKrwxzZRfewAkeHh0HDh+kjxLuzgXStgtZTxrDqQ4oJh331QOqlBGBcRa9pA9pXRiMehU8NxwbHB4TFh5QRxpJQhu4nxCOfBU1MRzy0QavmBGXgxR4aRgxLRxAOhskIx3jxAhsXxhNRRpm5ptnAAAD50lEQVR4nO3Y2XajOhAFUJekAmSDZwbbGI/xnMHJ///bLQk7nYdOnnqgc89+sTFZLA4llURaLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4f2Ctvzz9p+7jt+HT9Px5RG3y+A/ezG+herQ2n53UxYxO/3oVVRXtPk+4ICq/QcK3756w/fBVws4/n9D07gl/JHn/pvcUfoOE4cQnDE7KfXBgLGurfC5J2K0Tqrrfsg6UUR96r6w1uuGPQBL2XcJgQHO5VS7P/Q7R+OCDBedO6r+YYeHyay6yqncp1C2U1qPFfnAyjc5oHn1CnafJJuaW6pPTCZ/kwCVMXEKTEQ10S0/H/iz164FsBkd/+Fh+uWn4y8wwXJoW83PSzeU+9XQ5zctTRuFKihbMQxc7KChdusdQ0PNqPpeH0HNlN2dKx71Dn7ovTZ6s5tUltI8RDQJ3zEozs626T66GWTiOmU9JsvZV46tSQWBXqVtD+ErJJDbK3vI3lSR8NVINyj7epB74hbBOqHd1fVu3Lss5UaFlBqdJPUnnIV2bW0SzDId2ROGjvf3AWiklv/iEl/ZLy/ZCKoL730uBdWtDC0nYSSv/VLhMoyz46dWbwPTDXrxNJveer8r9papWw8QlVJf2LJD6nm/1ZWXy0eg6GktCqWS4rytrnru95g5TMwmrnLb3hGZed0sak+usl+gpps3R1ieZLxt/ckNTWSh8f62vEQ2bndAuqF2PUj0lWl3LspRPl/AQPRlZ9Vf1EFYTWRmy8znzCQs/G/01+u3HBid8CytlL7dOYx6ioZWpJuv/LeFR29VtmMouNRrZIFDxVqrHP2pod1GTR+nOrXxmkrpuwjwjP7ekl3ZcwlW01hw8JDTSbpPe6bticpm4hCVF83qBaY27B/V3Y3zBrkO5O45n21RWBEk4l/Vf2yy6J5Tc5Xi7kRdh89rx002XqauePSYP9dAu3qvZRPbYvsjz17J8r5lNPz3mgS5eadN1Cavo2e1lRpTsApYxO2Ml7bSfuBnomuzCSon1Oplxc9dD+0J+hCl52a2Uy0Kzrnzd1gnD3W1/Fg5d90zW2UXazYvvMfqtS4fRdbFOm1xCaSbVwt+eXQ1lRqlil3Zeele7HvuEnWffQmyPLnJ4rvfd+dIn5LjeplO4aG6fEer+uqcDN9K0KU/aMCt3xHFZ76k5LlwIle/n+9zIO5P//xSrolouX7OyuRuan/o4pfh+wO9vwG5rwPcdkFbGmKC5cxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfrn/ADCaOc2HgoxfAAAAAElFTkSuQmCC',
    },
    {
      teamName: '네이버',
      id: 3,
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAnFBMVEX/3AAAAB//4gD/4AD/5AD/3gD/4QAABh8ACB//5gAABx8AAB792gARFB8ACx99bRhcUhnKrwxzZRfewAkeHh0HDh+kjxLuzgXStgtZTxrDqQ4oJh331QOqlBGBcRa9pA9pXRiMehU8NxwbHB4TFh5QRxpJQhu4nxCOfBU1MRzy0QavmBGXgxR4aRgxLRxAOhskIx3jxAhsXxhNRRpm5ptnAAAD50lEQVR4nO3Y2XajOhAFUJekAmSDZwbbGI/xnMHJ///bLQk7nYdOnnqgc89+sTFZLA4llURaLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4f2Ctvzz9p+7jt+HT9Px5RG3y+A/ezG+herQ2n53UxYxO/3oVVRXtPk+4ICq/QcK3756w/fBVws4/n9D07gl/JHn/pvcUfoOE4cQnDE7KfXBgLGurfC5J2K0Tqrrfsg6UUR96r6w1uuGPQBL2XcJgQHO5VS7P/Q7R+OCDBedO6r+YYeHyay6yqncp1C2U1qPFfnAyjc5oHn1CnafJJuaW6pPTCZ/kwCVMXEKTEQ10S0/H/iz164FsBkd/+Fh+uWn4y8wwXJoW83PSzeU+9XQ5zctTRuFKihbMQxc7KChdusdQ0PNqPpeH0HNlN2dKx71Dn7ovTZ6s5tUltI8RDQJ3zEozs626T66GWTiOmU9JsvZV46tSQWBXqVtD+ErJJDbK3vI3lSR8NVINyj7epB74hbBOqHd1fVu3Lss5UaFlBqdJPUnnIV2bW0SzDId2ROGjvf3AWiklv/iEl/ZLy/ZCKoL730uBdWtDC0nYSSv/VLhMoyz46dWbwPTDXrxNJveer8r9papWw8QlVJf2LJD6nm/1ZWXy0eg6GktCqWS4rytrnru95g5TMwmrnLb3hGZed0sak+usl+gpps3R1ieZLxt/ckNTWSh8f62vEQ2bndAuqF2PUj0lWl3LspRPl/AQPRlZ9Vf1EFYTWRmy8znzCQs/G/01+u3HBid8CytlL7dOYx6ioZWpJuv/LeFR29VtmMouNRrZIFDxVqrHP2pod1GTR+nOrXxmkrpuwjwjP7ekl3ZcwlW01hw8JDTSbpPe6bticpm4hCVF83qBaY27B/V3Y3zBrkO5O45n21RWBEk4l/Vf2yy6J5Tc5Xi7kRdh89rx002XqauePSYP9dAu3qvZRPbYvsjz17J8r5lNPz3mgS5eadN1Cavo2e1lRpTsApYxO2Ml7bSfuBnomuzCSon1Oplxc9dD+0J+hCl52a2Uy0Kzrnzd1gnD3W1/Fg5d90zW2UXazYvvMfqtS4fRdbFOm1xCaSbVwt+eXQ1lRqlil3Zeele7HvuEnWffQmyPLnJ4rvfd+dIn5LjeplO4aG6fEer+uqcDN9K0KU/aMCt3xHFZ76k5LlwIle/n+9zIO5P//xSrolouX7OyuRuan/o4pfh+wO9vwG5rwPcdkFbGmKC5cxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfrn/ADCaOc2HgoxfAAAAAElFTkSuQmCC',
    },
  ];

  const channelList: { channel: string; id: number }[] = [
    {
      channel: '카카오',
      id: 1,
    },
    {
      channel: '다음',
      id: 2,
    },
    {
      channel: '네이버',
      id: 3,
    },
  ];

  return (
    <div className="channelListContainer">
      <Team teamList={teamList} />
      <div className="channelList">
        <Channel title="Channel" channelList={channelList} />
        <Channel title="Direct Message" channelList={channelList} />
      </div>
    </div>
  );
};

export default ListBox;
