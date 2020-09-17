import React from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';

import DialogActions from '@material-ui/core/DialogActions';

import Typography from '@material-ui/core/Typography';



class CustomerDelete extends React.Component {



constructor(props) { //생성자 명시해서 스테이트 값 초기화

super(props);

this.state = {

open: false //모달창 열려있는지 체크

}

this.handleClickOpen = this.handleClickOpen.bind(this)

this.handleClose = this.handleClose.bind(this);

}



handleClickOpen() {

this.setState({

open: true

});

}


handleClose() {

this.setState({

open: false

})

}



deleteCustomer(id){

const url = '/api/customers/' + id;

fetch(url, {

method: 'DELETE'

});

this.props.stateRefresh();

}



render() {

return (

<div>

<Button variant="contained" color="secondary" onClick={this.handleClickOpen}>

삭제

</Button>
{/* //어떤 상태일때 열려있는지 오픈 속성을 넣어야한다. */}
<Dialog onClose={this.handleClose} open={this.state.open}> 

<DialogTitle onClose={this.handleClose}>

삭제 경고

</DialogTitle>

<DialogContent>

<Typography gutterBottom>

선택한 고객 정보가 삭제됩니다.

</Typography>

</DialogContent>

<DialogActions>

<Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>

<Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>

</DialogActions>

</Dialog>

</div>

)

}

}



export default CustomerDelete;

