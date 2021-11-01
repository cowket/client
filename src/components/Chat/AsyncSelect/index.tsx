import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import selectContext from 'context/select';
import { getTeamParticipants } from 'api/team';
import userContext from 'context/user';

interface AsyncMultiProps {
  onSelect: (uuidList: string[]) => void;
}

function AsyncMulti({ onSelect }: AsyncMultiProps) {
  const { selectedTeam } = useContext(selectContext);
  const { userInfo } = useContext(userContext);
  const customStyles = {
    container: (props: any) => ({
      ...props,
      width: '460px',
    }),
    control: (props: any) => ({
      ...props,
      width: '100%',
    }),
  };
  const promiseOptions = (inputValue: string) => {
    if (selectedTeam) {
      return getTeamParticipants(selectedTeam?.uuid).then((res) =>
        res
          .filter(
            (each) =>
              each.uuid !== userInfo?.uuid && each.email.includes(inputValue)
          )
          .map((each) => ({ label: each.email, value: each.uuid }))
      );
    }
  };

  return (
    <AsyncSelect
      styles={customStyles}
      isMulti
      cacheOptions
      defaultOptions
      onChange={(res) => onSelect(res.map((user) => user.value))}
      loadOptions={promiseOptions}
    />
  );
}

export default AsyncMulti;
