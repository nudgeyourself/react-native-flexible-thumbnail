# react-native-flexible-thumbnail
A smaller version of a full-size image that you can easily align or apply an overlay to.
Inspired by [react-native-left-aligned-image](https://github.com/itinance/react-native-left-aligned-image), an elegant implementation of Image.getSize() to left-justify a variable-sized image within its container.

# IMPORTANT!
This is pretty alpha and the API, name, and purpose is subject to change.

# Why this library?
Image components don't act a whole lot like most other components once you apply the "contain" resizeMode. The size of the component can be based on flexbox, but ultimately the size of the image is probably less than the dimensions of the Image component, because the image is downloaded asynchronously and has to be shrunk. This makes stuff like aligning the image itself (and not just the Image component) to the left or right difficult. It's also difficult to overlay something just over the image itself.
This component resizes the Image component after the image is downloaded so the component and the image have the same dimensions. That way, you can do cool stuff like apply overlays or justify the image to one side or the other.

![demo of an icon overlayed over an image](https://github.com/nudgeyourself/react-native-flexible-thumbnail/blob/master/demo_image.jpg)

Go figure, it's not obvious how to do this in React Native.

# Props (all optional)
* maxHeight - the tallest your image can be. If you do not specify a height, it will max out at the screen height.
* maxWidth - the most wide your image can be. If you do not specify a width, it will max out at the screen width.
* renderOverlay - function that returns a component that will be overlayed directly over the image once the image is rendered. Useful for shading over an image or adding buttons over an image.
* imageStyle - additional styles to apply to the Image component. Useful for borderRadius. Note that this style is applied before the updated width and height, so if you put width and height in your custom style, they will have no effect.
* ImageComponent - If specified, will use this component for rending the image. Must accept `source` and `resizeMode` props.
* isStaticImage - (default: false) If your image is embedded within the app and referenced via a `requires()` function, then set this flag to true. This is needed because there is a completely different way to determine the size of a static image, and it's not possible (or at least not clear) as to how to definitively tell the difference between the two.
* children - If your `ImageComponent` supports children (e.g., it's a `BackgroundImage`), then you can supply children to the `FlexibleThumbnail`.
* containerStyle - Additional styles applied to the container outside of the image. This can be useful for applying padding to both the container and overlay, making overlays with elements that clip the view work better in Android, which seems to have issues with displaying anything absolutely-positioned that clips its parent.
* other props - any other props will be passed to the image component, so you can use other props supported by Image.

# Example (overlaying a component over the corner of an image)

```
             <FlexibleThumbnail
                source={someImageSource}
                maxHeight={150}
                imageStyle={{
                  borderRadius: 7,
                }}
                ImageComponent={Image}
                renderOverlay={() => (
                  <View
                    style={{
                      position: 'absolute',
                      // Android doesn't let these buttons overlap the overlay container
                      top: Platform.OS === 'ios' ? -14 : 7,
                      right: Platform.OS === 'ios' ? -14 : 7,
                    }}>
                    <TouchableOpacity onPress={onDeleteImage}>
                      <View
                        style={{
                          backgroundColor: 'red',
                          height: 28,
                          width: 28,
                          borderRadius: 14,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>X</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
```

# Potential Next steps
* handle updating of image on device rotation
* perhaps a loading indicator while it's figuring out the image size (which requires downloading the image). Or not... since you can pass your own ImageComponent in, you could pass an image component with a loading indicator.
