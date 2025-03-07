import * as ImageSource from 'tns-core-modules/image-source';
import { FloatingActionButtonBase, iconProperty } from './fab-common';

export class Fab extends FloatingActionButtonBase {
  public nativeView: UIView;

  constructor() {
    super();
    const btn = MNFloatingActionButton.alloc().init() as MNFloatingActionButton;
    btn.animationScale = 0.95;
    this.nativeView = btn;
  }

  [iconProperty.setNative](value: any) {
    let iconDrawable = null;
    let newImageView = null;
    if (ImageSource.isFileOrResourcePath(value)) {
      iconDrawable = ImageSource.fromFileOrResource(value);

      // Set the new one
      if (iconDrawable !== null) {
        newImageView = UIImageView.alloc().initWithImage(
          iconDrawable.ios
        ) as UIImageView;
      }
    } else {
      // Default image
      const defaultImage = ImageSource.fromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAJAAAACQAQAAAADPPd8VAAAAAnRSTlMAAHaTzTgAAAAqSURBVHgBY6AMjIJRYP9n0AuNCo0KMf+HgwPDTmgoRMeo0KgQRWAUjAIABsnZRR7bYyUAAAAASUVORK5CYII='
      ) as ImageSource.ImageSource;

      newImageView = UIImageView.alloc().initWithImage(
        defaultImage.ios
      ) as UIImageView;
    }

    if (newImageView !== null) {
      // Kill the old Image, cocoapod doesn't support changing it yet
      const button = this.nativeView.subviews[0] as MNFloatingActionButton;
      const oldBadImageView = button.subviews[0]; // this should be the image view inside the MNFloatingActionButton
      oldBadImageView.removeFromSuperview();

      // Add the new image to the button
      button.addSubview(newImageView);
    }
  }

  public onLayout(
    left: number,
    top: number,
    right: number,
    bottom: number
  ): void {
    super.onLayout(left, top, right, bottom);
    this._centerIcon();
  }

  private _centerIcon() {
    const frame = this.nativeView.frame as CGRect;
    const width = frame.size.width as number;
    const height = frame.size.height as number;

    const button = this.nativeView.subviews[0] as MNFloatingActionButton;
    const imageView = <UIImageView>button.subviews[0]; // should be the image view inside the MNFloatingActionButton

    imageView.contentMode = UIViewContentMode.ScaleAspectFit;
    imageView.frame = CGRectMake(0, 0, width / 2, height / 2);
    imageView.center = CGPointMake(width / 2, height / 2);
  }
}
