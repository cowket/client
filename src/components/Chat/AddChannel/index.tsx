import useDesktopSize from 'hooks/useDesktopSize';
import React, { useState, useContext, useEffect } from 'react';
import {
  postChannel,
  inviteUserPrivateChan,
  editChannel,
  getJoinedUsers,
  getChannelDetail,
} from 'api/channel';
import selectContext from 'context/select';
import channelContext from 'context/channel';
import userContext from 'context/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloseOutlined, ArrowBack } from '@material-ui/icons';
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Checkbox,
} from '@material-ui/core';
import './style.scss';
import AsyncMulti from '../AsyncSelect';

type AddChannelProps = {
  onClose(): void;
  channel?: Channel;
};

const AddChannel = ({ onClose, channel }: AddChannelProps) => {
  const [checked, setChecked] = useState<boolean>(channel?.is_private ?? false);
  const [privateUserList, setPrivateUserList] = useState<string[]>([]);
  const { userInfo } = useContext(userContext);
  const [defaultList, setDefaultList] =
    useState<{ label: string; value: string }[]>();
  const isDesktopSize = useDesktopSize();
  const { setChannelList, channelList } = useContext(channelContext);
  const { selectedTeam, selectedChannel } = useContext(selectContext);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (channel?.is_private && selectedTeam && selectedChannel) {
      getChannelDetail(selectedChannel.uuid).then((res) =>
        setDefaultList(
          res.members
            .filter((part) => part.user.uuid !== userInfo?.uuid)
            .map((part) => ({
              label: part.team_user_profile?.nickname ?? part.user.email,
              value: part.team_user_profile?.uuid ?? part.user.uuid,
            }))
        )
      );
    } else {
      setDefaultList([]);
    }
  }, [channel]);
  console.log(channel);
  const formik = useFormik({
    initialValues: {
      channelName: channel?.name ?? '',
      desc: channel?.description ?? '',
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required(''),
      desc: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (values.channelName && selectedTeam) {
        if (channel) {
          editChannel({
            channel_uuid: channel.uuid,
            name: values.channelName,
            is_private: checked,
            description: values.desc,
          }).then((res) => {
            setChannelList(
              channelList.map((chan) => {
                if (chan.uuid === res.uuid) {
                  return res;
                }
                return chan;
              })
            );
            if (checked && privateUserList.length > 0) {
              inviteUserPrivateChan(
                selectedTeam.uuid,
                channel.uuid,
                privateUserList.filter(
                  (user) =>
                    !defaultList?.map((list) => list.value).includes(user)
                )
              );
            }
          });
        } else {
          postChannel({
            team_uuid: selectedTeam.uuid,
            name: values.channelName,
            is_private: checked,
            description: values.desc,
          }).then((res) => {
            if (res) {
              setChannelList([...channelList, res]);
              if (checked && privateUserList.length > 0) {
                inviteUserPrivateChan(
                  selectedTeam.uuid,
                  res.uuid,
                  privateUserList
                );
              }
            }
          });
        }
      }
      onClose();
    },
  });

  return (
    <div className="modalWrapper">
      <div className="channelModalContainer">
        <header>
          <div className="title">
            {!isDesktopSize && (
              <IconButton
                size="small"
                onClick={onClose}
                style={{ marginRight: '10px' }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            {!!channel ? '?????? ????????????' : '?????? ????????????'}
          </div>
          {isDesktopSize && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </header>
        <desc>
          ????????? ?????? ???????????? ???????????????.
          <br />
          ????????? ??????(???: oo????????????)??? ???????????? ???????????? ?????? ?????? ????????????.
        </desc>
        <form
          className="channelForm"
          id="channelForm"
          onSubmit={formik.handleSubmit}
        >
          <section>
            <TextField
              id="channelName"
              label="??????"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
            />
            <TextField
              id="desc"
              label="??????(optional)"
              placeholder="????????? ?????? ????????????????"
              variant="outlined"
              size="small"
              multiline
              fullWidth
              margin="normal"
              minRows={3}
              onChange={formik.handleChange}
              value={formik.values.desc}
            />
            <div className="check">
              <Checkbox
                size="small"
                defaultChecked={checked}
                color="primary"
                onChange={onChange}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              private team
            </div>
            <div>
              {checked && defaultList && (
                <>
                  <p>????????? ????????? ?????????????????? ????????? ???????????????</p>
                  <AsyncMulti
                    defaultValue={defaultList}
                    onSelect={(value: string[]) => setPrivateUserList(value)}
                    editMode
                  />
                </>
              )}
            </div>
          </section>
          <div className="buttonBox">
            <Button variant="contained" onClick={() => onClose()}>
              ??????
            </Button>
            <Button
              type="submit"
              id="channelForm"
              variant="contained"
              color="primary"
              disabled={
                channel ? !formik.isValid : !(formik.dirty && formik.isValid)
              }
            >
              {channel ? '?????? ??????' : '?????? ??????'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChannel;
