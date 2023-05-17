import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Canvas, {Image} from 'react-native-canvas';
import {useDispatch, useSelector} from 'react-redux';
import {getParkingDetailsAsync} from './parkingSlice';

const SLOT_WIDTH = 20;
const SLOT_HEIGHT = 40;
const CANVAS_WIDTH = 380;
const CANVAS_HEIGHT = 310;
const SLOT_GAP = 0;
const CAR_WIDTH = 20;
const CAR_HEIGHT = 30;

const CarParkingCanvas = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const parkingState = useSelector(state => state.park);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    dispatch(getParkingDetailsAsync());

    console.log(parkingState);

    if (canvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (canvas.getContext) {
        let x = 20,
          y = 90;

        ctx.beginPath();
        ctx.strokeStyle = '#f00';
        for (i = 0; i <= 16; i++) {
          ctx.moveTo(x, y);
          x = createBottomParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();
        x = 20;
        y = 100;
        for (i = 0; i <= 16; i++) {
          ctx.moveTo(x, y);
          x = createTopParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();
        x = 20;
        y = 220;
        for (i = 0; i <= 16; i++) {
          ctx.moveTo(x, y);
          x = createBottomParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();
        x = 20;
        y = 230;
        for (i = 0; i <= 16; i++) {
          ctx.moveTo(x, y);
          x = createTopParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();

        const image = new Image(canvas);
        image.src = `https://raw.githubusercontent.com/Yathaartha/ParkIT-app/master/src/assets/images/car-top-view.png`;

        image.addEventListener('load', function () {
          ctx.drawImage(image, 20, 55, CAR_WIDTH, CAR_HEIGHT);
          ctx.drawImage(image, 20, 185, CAR_WIDTH, CAR_HEIGHT);
        });
        ctx.stroke();
      }
    }
  }, []);

  function createTopParkingLot(ctx, x, y) {
    ctx.lineTo(x + SLOT_WIDTH, y);
    ctx.lineTo(x + SLOT_WIDTH, y + SLOT_HEIGHT);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + SLOT_HEIGHT);
    ctx.moveTo(x, y + SLOT_HEIGHT);
    ctx.stroke();
    return x + SLOT_WIDTH;
  }

  function createBottomParkingLot(ctx, x, y) {
    ctx.lineTo(x + SLOT_WIDTH, y);
    ctx.lineTo(x + SLOT_WIDTH, y - SLOT_HEIGHT);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - SLOT_HEIGHT);
    ctx.moveTo(x, y - SLOT_HEIGHT);
    ctx.stroke();
    return x + SLOT_WIDTH;
  }

  // return (
  //   <View style={styles.container}>
  //     <Canvas
  //       ref={canvasRef}
  //       style={{width: '100%', height: '100%', backgroundColor: 'black'}}
  //     />
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas
          ref={canvasRef}
          style={styles.canvas}
          // width
          // width={CANVAS_WIDTH}
          // height={CANVAS_HEIGHT}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  canvasContainer: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
});

export default CarParkingCanvas;
