import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Canvas, {Image} from 'react-native-canvas';
import {useDispatch, useSelector} from 'react-redux';
import {getParkingDetailsAsync} from './parkingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SLOT_WIDTH = 20;
const SLOT_HEIGHT = 40;
const CANVAS_WIDTH = 380;
const CANVAS_HEIGHT = 310;
const SLOT_GAP = 0;
const CAR_WIDTH = 20;
const CAR_HEIGHT = 30;

const ParkingLotWithRoute = ({
  showEntrance,
  showClosestParking,
  closestSlot,
}) => {
  const canvasRef = useRef();
  const [localData, setLocalData] = useState({});
  const {parking} = useSelector(state => state.park);
  const [isLoading, setIsLoading] = useState(true);

  const getCarCoords = (lane, slot) => {
    switch (lane) {
      case 1:
        return {x: slot * 20, y: 55};
      case 2:
        return {x: slot * 20, y: 105};
      case 3:
        return {x: slot * 20, y: 185};
      case 4:
        return {x: slot * 20, y: 235};
    }
  };

  useEffect(() => {
    async function getLocalData() {
      const data = await AsyncStorage.getItem('booking');

      setLocalData(JSON.parse(data));
    }

    getLocalData();
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

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
        ctx.closePath();

        const image = new Image(canvas);
        image.src = `https://raw.githubusercontent.com/Yathaartha/ParkIT-app/master/src/assets/images/car-top-view.png`;

        image.addEventListener('load', function () {
          parking.slots.forEach(slot => {
            const {x, y} = getCarCoords(slot.laneNumber, slot.slotNumber);
            ctx.drawImage(image, x, y, CAR_WIDTH, CAR_HEIGHT);
          });
          setIsLoading(false);
        });

        if (showClosestParking === true && localData?.laneNumber) {
          ctx.beginPath();
          ctx.font = '15px arial';
          ctx.fillText(' - Nearest Empty Slot', 140, 30);
          ctx.fillStyle = '#f00';
          ctx.rect(130, 20, 10, 10);
          ctx.fill();
          switch (localData.laneNumber) {
            case 1:
              y = 50;
              break;
            case 2:
              y = 101;
              break;
            case 3:
              y = 180;
              break;
            case 4:
              y = 230;
              break;
          }
          ctx.rect(
            20 * localData.slotNumber,
            y,
            SLOT_WIDTH - 1,
            SLOT_HEIGHT - 1,
          );
          ctx.fill();
          ctx.stroke();
          drawRoute(ctx, localData.laneNumber);
        }

        // ctx.stroke();
      }
    }
  }, [localData.laneNumber, parking.slots]);

  const drawRoute = (ctx, lane) => {
    ctx.strokeStyle = '#ADD8E6';
    ctx.moveTo(CANVAS_WIDTH - 10, 160);
    ctx.lineWidth = 4;
    switch (lane) {
      case 1:
        ctx.lineTo(CANVAS_WIDTH - 10, 40);
        ctx.lineTo(20 * localData.slotNumber + 10, 40);
        ctx.lineTo(20 * localData.slotNumber + 10, 50);
        break;
      case 2:
        ctx.lineTo(20 * localData.slotNumber + 10, 160);
        ctx.lineTo(20 * localData.slotNumber + 10, 101 + SLOT_HEIGHT);
        break;
      case 3:
        ctx.lineTo(20 * localData.slotNumber + 10, 160);
        ctx.lineTo(20 * localData.slotNumber + 10, 180);
        break;
      case 4:
        ctx.lineTo(CANVAS_WIDTH - 10, 240);
        ctx.lineTo(20 * localData.slotNumber + 10, 240);
        ctx.lineTo(20 * localData.slotNumber + 10, 230);
    }
    ctx.stroke();
  };

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
      <View style={styles.canvasContainer}>
        <Canvas ref={canvasRef} style={styles.canvas} />
        <ActivityIndicator
          animating={isLoading}
          size="large"
          style={styles.loader}
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
    position: 'relative',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '48%',
    left: '48%',
  },
});

export default ParkingLotWithRoute;
