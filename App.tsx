import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

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
  const [state, setState] = useState("")
  const [result, setResult] = useState("");

  function handleButtonPress(action: string) {
    setResult("")
    switch (action) {
      case "=":
        const finalNum = calculateResult()
        setResult(finalNum);
        setState(finalNum.toString())
        break;

      case "":
        setResult("");
        setState("");
        break;

      default:
        let res = state
        if (!res.length) {
          res = action
        }
        else if (isNaN(Number(res.charAt(-1)))) {
          console.log(1)
          res = res.slice(0, res.length - 2) + action
        }
        else if (res.length > 1 && isNaN(Number(res.charAt(-2)))) {
          console.log(2)
          res = res.slice(0, res.length - 2) + action
        }
        else if (!res.length && isNaN(Number(res.charAt(-1))) && isNaN(Number(action))) {
          console.log(3)
          res = res.slice(0, res.length - 2) + action
        }
        else {
          console.log(4)
          res = state + action
        }
        console.log({ res })
        setState(res)
        break;
    }
  }

  function calculateResult() {
    let res = "";
    if (!state.length) {
      return ""
    }
    if (!isNaN(parseInt(state.charAt(-1)))) {
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
  }

  const evaluatedResult = useMemo(() => {
    return calculateResult()
  }, [state])

  return (
    <SafeAreaView className='flex-1 bg-neutral-100 dark:bg-neutral-900 p-4'>
      <StatusBar className='bg-black dark:bg-white' />
      <View className="flex-grow justify-between w-full max-w-lg mx-auto">
        <View className='flex-grow px-10 gap-4'>
          <View className='flex-grow items-end justify-end'>
            <Text className={'text-right  ' + (result ? "text-8xl text-black dark:text-white font-semibold" : "text-3xl text-neutral-500")}>{result || state}</Text>
          </View>
          {result ? <></> : <Text className='text-black dark:text-white text-7xl font-semibold text-right'>
            {evaluatedResult}
          </Text>}
        </View>
        <View className='flex items-center justify-between flex-row flex-wrap gap-4 p-4'>
          {
            buttons.map((button, index) => (
              <CircleButton key={index} {...button} backgroundColor={(index + 1) % 4 === 0 ? 'bg-orange-500' : button.backgroundColor} onPress={() => handleButtonPress(button.action)} />
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
  const size = 78
  return (
    <TouchableOpacity onPress={onPress} style={{ width: size, height: size }} className={`${backgroundColor} rounded-full flex items-center justify-center`}>
      <Text className='text-4xl font-semibold text-black dark:text-white '>{text}</Text>
    </TouchableOpacity>
  )
}