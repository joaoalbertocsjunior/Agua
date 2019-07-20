import {
	View,
	Text,
	FlatList
  } from 'react-native';
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';
  
  export default class RenderList extends Component {
	// constructor(props) {
	//   super(props);
	//
	//   this.props={
	//     dataList: {},
	//     itensRender: {},
	//     extractorKey: {}
	//   }
	// }
	static propTypes = {
		dataList: PropTypes.any,
		itemRender: PropTypes.any,
		extractorKey: PropTypes.any
	}
  
	render = () => {
	  const { dataList, itemRender, extractorKey } = this.props;
	return (
	  <FlatList
		data={dataList}
		renderItem={itemRender}
		keyExtractor={extractorKey} />
	);
	}
	}
