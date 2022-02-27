import React from 'react'

interface Props {
  friendId: string
}

interface State {
  status: boolean
}

class FriendStatusClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      status: false // 默认不在线
    }
  }
  render() {
    return (
      <div>
        好友： {this.props.friendId}
        在线状态：{this.state.status}
      </div>
    )
  }
  componentDidMount() {
    console.log(`开始监听${this.props.friendId}的在线状态`)
  }
  componentWillUnmount() {
    console.log(`结束监听${this.props.friendId}的在线状态`)
  }
  componentDidUpdate(prevProps: Props) {
    console.log(`结束监听${prevProps.friendId}在线状态`)
    console.log(`开始监听${this.props.friendId}在线状态`)
  }
}

export default FriendStatusClass