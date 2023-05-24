import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import chevronDown from '../../assets/icons/chevron-down-solid.png';
import chevronUp from '../../assets/icons/chevron-up-solid.png';

const faqData = [
  {
    question: 'What is ParkIT?',
    answer:
      'ParkIT is a smart parking system that allows users to find the nearest empty parking slot and displays a route to the specified spot.',
  },
  {
    question: 'How to use ParkIT?',
    answer:
      "It is as simple as pressing the Park button on the home page. Once you've pressed the button, the app will display the nearest empty parking slot and ask you for your vehicle number. After submitting the form the app will display the shortest route to the specified spot.",
  },
  {
    question: 'How to end parking session?',
    answer:
      'Once you\'ve booked your parking slot, you will be directed to the post parking screen. There you will find a "End Parking" button. Pressing the button will end your parking session and display the total amount due.',
  },
  {
    question:
      'I deleted the app and reinstalled it but now my parking session is not showing. What do I do?',
    answer:
      'You can click on the "I already have a booking" button on the home page and enter your vehicle number. This will display your parking session details.',
  },
  // Add more question-answer pairs here...
];

const FAQScreen = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const renderAccordionItem = (item, index) => {
    const isActive = index === activeIndex;

    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => toggleAccordion(index)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: '#F5F5F5',
            borderBottomWidth: 1,
            borderColor: '#E0E0E0',
          }}>
          <Text style={{fontSize: 16}}>{item.question}</Text>
          <Image
            source={isActive ? chevronUp : chevronDown}
            style={{width: 16, height: 16}}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!isActive}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 16,
              paddingTop: 10,
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderColor: '#E0E0E0',
            }}>
            <Text style={{fontSize: 14}}>{item.answer}</Text>
          </View>
        </Collapsible>
      </View>
    );
  };

  return (
    <View>
      {faqData.map((item, index) => renderAccordionItem(item, index))}
    </View>
  );
};

export default FAQScreen;
