# react-native-flexible-thumbnail
A smaller version of a full-size image that you can easily align or apply an overlay to.
Inspired by [react-native-left-aligned-image](https://github.com/itinance/react-native-left-aligned-image), an elegant implementation of Image.getSize() to left-justify a variable-sized image within its container.

# IMPORTANT!
This is pretty alpha and the API, name, and purpose is subject to change.

# Why this library?
Image components don't act a whole lot like most other components once you apply the "contain" resizeMode. The size of the component can be based on flexbox, but ultimately the size of the image is probably less than the dimensions of the Image component, because the image is downloaded asynchronously and has to be shrunk. This makes stuff like aligning the image itself (and not just the Image component) to the left or right difficult. It's also difficult to overlay something just over the image itself.
This component resizes the Image component after the image is downloaded so the component and the image have the same dimensions. That way, you can do cool stuff like apply overlays or justify the image to one side or the other.

# Props
* maxHeight (required) - the tallest your image can be. It will be shrunk to match this minimum height using resizeMode = contain.
* maxWidth - you can also specify a maximum width of the image. If you don't, the widest your image can be is the width of the screen.
* renderOverlay - function that returns a component that will be overlayed directly over the image once the image is rendered. Useful for shading over an image or adding buttons over an image.
* imageStyle - additional styles to apply to the Image component. Useful for borderRadius. Note that this style is applied before the updated width and height, so if you put width and height in your custom style, they will have no effect.

# Potential Next steps
* handle updating of image on device rotation
* customizable containerStyle. Seems like this might be useful for applying padding to both the container and overlay, making overlays with elements that clip the view work better in Android, which seems to have issues with displaying anything absolutely-positioned that clips its parent.
* perhaps a loading indicator while it's figuring out the image size (which requires downloading the image)
