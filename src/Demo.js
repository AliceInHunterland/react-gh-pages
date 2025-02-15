import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {LivePreview, LiveProvider,} from 'react-live';
import vsDark from 'prism-react-renderer/themes/vsDark';
import FFmpeg from './components/FFmpeg';
// import DemoLinkCard from './components/DemoLinkCard';
// import codepen from './assets/codepen.png';
import ContactsIcon from './pngegg.png';

const TESTDATA_URL = 'https://github.com/ffmpegwasm/testdata';

const CONFIGS = {
  x264: `
{
  args: ['-i', 'video.avi', '-c:v', 'libx264', 'video.mp4'],
  inFilename: 'video.avi',
  outFilename: 'video.mp4',
  mediaType: 'video/mp4',
}`.trim('\n'),
  libvpx: `
{

  args: [ '-i','video.avi','-vf','crop=in_w:in_h-200,scale=960:-1', '-r', '1', '%04d.png'],
  inFilename: 'video.avi',
  outFilename: '0001.png',
  mediaType: 'image/png',
}`.trim('\n'),
  lame: `
{
  args: ['-i', 'audio.wav', '-c:a', 'libmp3lame', 'audio.mp3'],
  inFilename: 'audio.wav',
  outFilename: 'audio.mp3',
  mediaType: 'audio/mp3',
}`.trim('\n'),
};

// const CODEPENS = [
//   {
//     title: 'WebCam',
//     url: 'https://codepen.io/jeromewu/details/qBBKzyW',
//   },
//   {
//     title: 'To x264 mp4',
//     url: 'https://codepen.io/jeromewu/pen/NWWaMeY',
//   },
// ];

const useStyles = makeStyles({
  root: {
    margin: '48px 0px 48px 0px',
  },
  para: {
    margin: '16px 0px 24px 0px',
  },
});

function Demo() {
  const classes = useStyles();
  const [config, setConfig] = useState('x264');
  const onConfigChanged = (evt) => {
    setConfig(evt.target.value);
  };
  const IS_COMPATIBLE = typeof SharedArrayBuffer === 'function';
  return (
    <Grid className={classes.root} container direction="column" >
      <Typography align="center" variant="h4">
        Demo

        <br></br>
        <br></br>
        <img src={ContactsIcon} id="input-image"  align="center"
             className="input-image img-fluid rounded mx-auto d-block" alt="Input image" ></img>
      </Typography>



      {
        !IS_COMPATIBLE ? (
          <>
            <Typography align="center" variant="h6">
              Your browser doesn't support SharedArrayBuffer, thus ffmpeg.wasm cannot execute. Please use latest version of Chromium or any other browser supports SharedArrayBuffer.
            </Typography>
          </>
        ) : (
          <>
            <LiveProvider
              theme={vsDark}
              code={CONFIGS[config]}
              scope={{ FFmpeg }}
              transformCode={(code) => (
                `() => { const props=${code}; return <FFmpeg {...props} />;}`
              )}
            >
              <LivePreview />


            </LiveProvider>
          </>
        )
      }
      {/*
      <Typography className={classes.para} align="center" variant="h6">
        Live Demo on CodePen
      </Typography>
      <Grid container justify="center" spacing={2}>
        {
          CODEPENS.map(({ title, url }) => (
            <Grid item key={url}>
              <DemoLinkCard
                img={codepen}
                title={title}
                url={url}
              />
            </Grid>
          ))
        }
      </Grid>
      */}
    </Grid>
  );
}

export default Demo;
