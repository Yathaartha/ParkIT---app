import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Canvas, {Image} from 'react-native-canvas';

const SLOT_WIDTH = 20;
const SLOT_HEIGHT = 40;
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 300;
const SLOT_GAP = 10;
const CAR_WIDTH = 20;
const CAR_HEIGHT = 30;

const CarParkingCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (canvas.getContext) {
        let x = 20,
          y = 10;

        ctx.beginPath();
        ctx.strokeStyle = '#f00';
        for (i = 0; i <= 8; i++) {
          ctx.moveTo(x, y);
          x = createTopParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();
        x = 20;
        y = 150;
        for (i = 0; i <= 8; i++) {
          ctx.moveTo(x, y);
          x = createBottomParkingLot(ctx, x, y);
          x += SLOT_GAP;
        }
        ctx.stroke();

        const image = new Image(canvas);
        image.src = `https://raw.githubusercontent.com/Yathaartha/ParkIT-app/master/src/assets/images/car-top-view.png`;

        ctx.drawImage(image, 20, 15, CAR_WIDTH, CAR_HEIGHT);
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

  return (
    <View style={styles.container}>
      <Canvas
        ref={canvasRef}
        style={styles.canvas}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    height: CANVAS_HEIGHT,
    // width: CANVAS_WIDTH,
    flex: 1,
    margin: 0,
  },
  canvas: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default CarParkingCanvas;
