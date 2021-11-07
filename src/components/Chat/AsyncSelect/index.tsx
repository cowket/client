import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import { getTeamParticipants } from 'api/team';
import selectContext from 'context/select';
import { getJoinedUsers } from 'api/channel';
import userContext from 'context/user';

interface AsyncMultiProps {
  onSelect: (uuidList: string[]) => void;
  defaultValue?: { label: string; value: string }[];
  editMode?: boolean;
}

function AsyncMulti({
  onSelect,
  defaultValue,
  editMode = false,
}: AsyncMultiProps) {
  const { selectedTeam, selectedChannel } = useContext(selectContext);
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
    if (selectedTeam && selectedChannel) {
      if (editMode) {
        return getTeamParticipants(selectedTeam?.uuid).then((res) =>
          res
            .filter(
              (each) =>
                each.uuid !== userInfo?.uuid && each.email.includes(inputValue)
            )
            .map((each) => ({ label: each.email, value: each.uuid }))
        );
      }
      return getJoinedUsers(selectedTeam.uuid, selectedChannel.uuid).then(
        (res) =>
          res
            .filter(
              (each) =>
                each.user_uuid.uuid !== userInfo?.uuid &&
                (
                  each.team_user_profile?.nickname ?? each.user_uuid.email
                ).includes(inputValue)
            )
            .map((each) => ({
              label: each.team_user_profile?.nickname ?? each.user_uuid.email,
              value: each.user_uuid.uuid,
            }))
      );
    }
  };

  return (
    <AsyncSelect
      defaultValue={defaultValue}
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
