import { Component, OnInit } from '@angular/core';

enum MobileOS {
  Android = 'android',
  iOS = 'ios',
  Unknown = 'unknown',
  WindowsPhone = 'Windows Phone',
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const userAgent: string = navigator.userAgent || navigator.vendor;

    this.getDevice(userAgent);
  }

  isMobileDevice = (userAgent: string): boolean => {
    const regexs = [
      /(Android)(.+)(Mobile)/i,
      /BlackBerry/i,
      /iPhone|iPod/i,
      /Opera Mini/i,
      /IEMobile/i,
    ];
    return regexs.some((b) => userAgent.match(b));
  };

  isTabletDevice = (userAgent: string): boolean => {
    const regex =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
    return regex.test(userAgent.toLowerCase());
  };

  isDesktopDevice = (userAgent: string): boolean =>
    !this.isMobileDevice(userAgent) && !this.isTabletDevice(userAgent);

  getMobileOS = (userAgent: string): MobileOS | undefined => {
    if (this.isMobileDevice(userAgent)) {
      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) return MobileOS.WindowsPhone;
      else if (/android/i.test(userAgent)) return MobileOS.Android;

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent)) return MobileOS.iOS;

      return MobileOS.Unknown;
    } else return undefined;
  };

  getDevice = (userAgent: string) => {

    const desktopUrl:string = 'https://www.google.cl';
    
    if(this.isDesktopDevice(userAgent)){
      console.log('estoy en un ordenador');
      //window.open(desktopUrl,'_blank');
    }else if(this.isMobileDevice(userAgent) || this.isTabletDevice(userAgent)){
      
      console.log('mobile',this.getMobileOS(userAgent));

      setTimeout(function() {
        window.location.href = desktopUrl;
      }, 25);
      
      // If "custom-uri://" is registered the app will launch immediately and your
      // timer won't fire. If it's not set, you'll get an ugly "Cannot Open Page"
      // dialogue prior to the App Store application launching
      window.location.href = "custom-uri://";
    }
    

  };
}
