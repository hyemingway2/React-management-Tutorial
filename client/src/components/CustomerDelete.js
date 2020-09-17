import React from 'react';

class CustomerDelete extends React.Component {

deleteCustomer(id){
const url = '/api/customers/' + id; //딜리트를 했을 때 해당 경로로 가서 삭제 시키는 것 이런식으로 삭제함
fetch(url, {
method: 'DELETE'
});
this.props.stateRefresh();
}

render() {
return (
<button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button> //삭제 눌렀을 때 딜리트 커스터머 불러옴.
)
}
}

export default CustomerDelete;

