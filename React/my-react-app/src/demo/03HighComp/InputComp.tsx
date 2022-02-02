import React, { Component } from 'react';
import Local from './Local';
interface Props {
  data: string;
  save: (e: any) => void
}
class InputComp extends Component<Props> {
  render(): React.ReactNode {
      return (
        <input defaultValue={this.props.data} onChange={this.props.save}/>
      )
  }
}

export default Local(InputComp, 'username', '用户名')

