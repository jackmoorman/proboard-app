import React from 'react';

function RootLoading() {
  return (
    <div className="mt-12 flex gap-5">
      <h1 className="text-3xl">Loading...</h1>
      <div
        className="tenor-gif-embed h-8 w-8"
        data-postid="23067502"
        data-share-method="host"
        data-aspect-ratio="1"
        data-width="100%"
      >
        <a href="https://tenor.com/view/loading-gif-hr-gif-23067502">
          Loading Gif Sticker
        </a>
        from{' '}
        <a href="https://tenor.com/search/loading-stickers">Loading Stickers</a>
      </div>{' '}
      <script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></script>
    </div>
  );
}

export default RootLoading;
