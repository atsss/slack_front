// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel, createMessage } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';

type MessageType = {
  id: number,
}

type Props = {
  socket: any,
  channel: any,
  room: Object,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
  createMessage: () => void,
  messages: Array<MessageType>,
}

class Room extends Component {
  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  props: Props

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '95vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList messages={this.props.messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
  }),
  { connectToChannel, leaveChannel, createMessage }
)(Room);
