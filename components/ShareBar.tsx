import { Children, useEffect, useState } from 'react';
import {
    FacebookShareCount,
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon,
    TwitterShareButton
  } from 'react-share'
import React from 'react';

type ShareBarProps = {
    children?: any
    url: string
}

function ShareBar({children, url}:ShareBarProps) {

    const title = 'Locations of Interest Explorer';

    // The facebook messager dialog does not work in installed PWA mode
    const isInPWA = localStorage.getItem('AppInstalled') === '1'

    return (
      <>{!url.length ? <div>Loading</div> :
      <>
        {children}
        <div className="grid grid-flow-col pt-4 items-center px-2">
            <div className="m-auto">
              <div onClick={() => navigator.share({url: 'https://chch-water-reporter.vercel.app'})}>
                Share IT!
              </div>
              <FacebookShareButton
                  url={url}
                  quote={title}
                  className="Demo__some-network__share-button"
              >
                    <FacebookIcon size={40} round />
              </FacebookShareButton>
              <WhatsappShareButton
                  url={url}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <TwitterShareButton
                url={url}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <EmailShareButton
                url={url}
                subject={title}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
        {/*process.env.NEXT_PUBLIC_FACEBOOK_APP_ID && !isInPWA &&
          <div className="m-auto">
            <FacebookMessengerShareButton
              url={url}
              appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
              className="Demo__some-network__share-button"
            >
              <FacebookMessengerIcon size={40} round />
            </FacebookMessengerShareButton>
        </div>*/}
      </div>
      </>}
    </>)
}


export {
  ShareBar
}