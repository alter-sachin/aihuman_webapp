import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css';

export default function AvatarViewPage(props) {
  const [avatarData, setAvatarData] = useState(null);

  useEffect(() => {
    const poll = setInterval(async () => {
      const result = await axios.get(
        // eslint-disable-next-line react/prop-types
        `/api/avatar/${props.match.params.avatarId}`
      );
      const { data } = result;
      setAvatarData(data);
      if (data.status === 'COMPLETE') {
        clearInterval(poll);
      }
    }, 10000);
    return () => {
      clearInterval(poll);
    };
  }, []);

  return (
    <div>
      <h1 className="status">
        Status:
        {avatarData && avatarData.status}
      </h1>
    </div>
  );
}
