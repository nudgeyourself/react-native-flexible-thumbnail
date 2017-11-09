import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';

import { calcDim } from './calculateDimensions';

export default class FlexibleThumbnail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            height: 0,
            width: 0,
            imageWidth: 0,
            imageHeight: 0,
            source: null,
        }
    }

    componentWillMount() {
        this._updateState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this._updateState(nextProps)
    }

    _updateState(props) {
        const {source} = props;
        const height = props.maxHeight;
        const width = props.maxWidth || Dimensions.get('window').width;

        const imageUri = source.uri;

        Image.getSize(imageUri, (iw, ih) => {
            const {imageWidth, imageHeight} = calcDim(iw, ih, height, width)

            this.setState({
                imageWidth,
                imageHeight,
                source,
                height: height,
                width: width,
            });
        });
    }

    render() {
        const {source, height, width, imageWidth, imageHeight} = this.state;
        const { renderOverlay, imageStyle } = this.props;

        if (source) {
            return (
                <View style={{width: imageWidth, height: imageHeight}} >
                    <Image
                        style={[ imageStyle, {width: imageWidth, height: imageHeight} ]}
                        resizeMode="contain"
                        source={source}
                    />
                    {
                        renderOverlay ?
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'transparent',
                        }}>
                            {renderOverlay()}
                        </View>
                        :
                        null
                    }
                </View>
            );
        }

        return (
            <View />
        )
    }
}
