import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { calcDim } from './calculateDimensions';

export default class FlexibleThumbnail extends Component {

    constructor(props) {
        super(props)

        this.state = {
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
        const dimensions = Dimensions.get('window');
        const maxHeight = props.maxHeight || dimensions.height;
        const maxWidth = props.maxWidth || dimensions.width;

        if (this.props.isStaticImage) {
            const localImageDimensions = resolveAssetSource(this.props.source);
            const {imageWidth, imageHeight} = calcDim(localImageDimensions.width, localImageDimensions.height, maxHeight, maxWidth);

            this.setState({
                imageWidth,
                imageHeight,
                source,
            });
            return;
        }

        const imageUri = source.uri;

        Image.getSize(imageUri, (iw, ih) => {
            const {imageWidth, imageHeight} = calcDim(iw, ih, maxHeight, maxWidth);

            this.setState({
                imageWidth,
                imageHeight,
                source,
            });
        });
    }

    render() {
        const {source, imageWidth, imageHeight} = this.state;
        const { renderOverlay, imageStyle, children, containerStyle, ...props } = this.props;
        let ImageComponent = this.props.ImageComponent;

        if (!ImageComponent) {
            ImageComponent = Image;
        }

        if (source) {
            return (
                <View style={[{width: imageWidth, height: imageHeight}, containerStyle]} >
                    <ImageComponent
                        style={[ imageStyle, {width: imageWidth, height: imageHeight} ]}
                        imageStyle={imageStyle}
                        resizeMode="contain"
                        source={source}
                        {...props}
                    >
                    {children}
                    </ImageComponent>
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

FlexibleThumbnail.propTypes = {
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    children: PropTypes.any,
    containerStyle: PropTypes.any,
    renderOverlay: PropTypes.func,
    ImageComponent: PropTypes.func,
    isStaticImage: PropTypes.bool,
    imageStyle: PropTypes.any,
};

FlexibleThumbnail.defaultProps = {
    maxHeight: null,
    maxWidth: null,
    children: null,
    containerStyle: null,
    renderOverlay: null,
    ImageComponent: null,
    isLocalImage: null,
    imageStyle: null,
};
