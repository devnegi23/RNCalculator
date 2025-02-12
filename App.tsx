import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StatusBar, SafeAreaView } from 'react-native';
const screen = Dimensions.get("screen")

const buttons = [
  {
    text: "AC",
    action: "",
    backgroundColor: "bg-neutral-200 dark:bg-neutral-500",
  },
  {
    text: "C",
    action: "",
    backgroundColor: "bg-neutral-200 dark:bg-neutral-500",
  },
  {
    text: "%",
    action: "%",
    backgroundColor: "bg-neutral-200 dark:bg-neutral-500",
  },
  {
    text: "/",
    action: "/",
  },
  {
    text: "7",
    action: "7",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "8",
    action: "8",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "9",
    action: "9",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "X",
    action: "*",
  },
  {
    text: "4",
    action: "4",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "5",
    action: "5",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "6",
    action: "6",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "-",
    action: "-",
  },
  {
    text: "1",
    action: "1",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "2",
    action: "2",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "3",
    action: "3",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "+",
    action: "+",
  },
  {
    text: "00",
    action: "00",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "0",
    action: "0",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: ".",
    action: ".",
    backgroundColor: "bg-neutral-50 dark:bg-neutral-700",
  },
  {
    text: "=",
    action: "=",
  },
]


export default function App() {
  const [state, setState] = useState("2+2")
  const [result, setResult] = useState("");

  const handleButtonPress = (action: string) => {
    setResult("")
    switch (action) {
      case "=":
        const finalNum = eval(state)
        setResult(finalNum);
        setState(finalNum.toString())
        break;

      case "":
        setResult("");
        setState("");
        break;

      default:
        setState(state + action)
        break;
    }
  }

  const evaluatedResult = useMemo(() => {
    let res = "";
    if (!isNaN(Number(state.slice(-1)))) {
      res = eval(state)
    }
    else {
      res = eval(state.slice(0, state.length - 1))
    }
    const numberResult = Number(res);
    if (isNaN(numberResult)) {
      return "";
    }

    if (numberResult % 1 !== 0) {
      return numberResult.toFixed(4).replace(/(\.0+|(\.[0-9]*[1-9])0+)$/, '$2');
    }

    return numberResult.toString();
  }, [state])

  console.log({ state })
  return (
    <SafeAreaView className='flex-1'>
      <StatusBar />
      <View className="flex-1 bg-neutral-100 dark:bg-neutral-900 justify-between">
        <View className='flex-grow px-10 gap-4'>
          <View className='flex-grow items-end justify-end'>
            <Text className={'text-right  ' + (result ? "text-8xl text-black dark:text-white font-semibold" : "text-3xl text-neutral-500")}>{result || state}</Text>
          </View>
          {result ? <></> : <Text className='text-black dark:text-white text-7xl font-semibold text-right'>
            {evaluatedResult}
          </Text>}
        </View>
        <View className='flex items-center justify-center flex-row flex-wrap gap-4 p-4'>
          {
            buttons.map((button, index) => (
              <CircleButton key={index} {...button} backgroundColor={(index + 1) % 4 === 0 ? 'bg-orange-400' : button.backgroundColor} onPress={() => handleButtonPress(button.action)} />
            ))
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

const CircleButton = ({
  backgroundColor = "bg-neutral-700",
  text,
  onPress,
}: {
  backgroundColor?: string;
  text: string;
  onPress: () => void;
}) => {
  const size = screen.width / 4 - 20
  return (
    <TouchableOpacity onPress={onPress} style={{ width: size, height: size }} className={`${backgroundColor} rounded-full flex items-center justify-center`}>
      <Text className='text-4xl font-semibold text-black dark:text-white '>{text}</Text>
    </TouchableOpacity>
  )
}