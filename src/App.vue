<script setup lang="ts">
import Char from './components/Char.vue'
import confetti from 'canvas-confetti'
import Map from './components/Map.vue'
import { cityMap } from './cityMap'
import { } from './utils/check'

interface charCheck {
  char: string
  status: 'right' | 'wrong' | 'normal'
}
interface Check {
  word: charCheck[]
  location: string
}

let text = $ref('')
const mapRef = $ref<InstanceType<typeof Map> | null>(null)
const history = $ref<any>([])
const resultArr = $ref<Check[]>([])
const answerIndex = Math.floor(Math.random() * Object.keys(cityMap).length)
const answer = Object.keys(cityMap)[answerIndex]
const answerCenter = cityMap[answer]
console.log(answer)

const handleClick = () => {
  if (mapRef && cityMap[text]) {
    mapRef.addMark(cityMap[text])
  }
  history.push(text)
  resultArr.push(checkWord(text))
  if (text === answer) {
    confetti({
      angle: 60,
      spread: 55,
      origin: { x: -0.05 },

    });
    confetti({
      angle: 120,
      spread: 55,
      origin: { x: 1.05 },

    });
  }
}
const checkWord = (word: string) => {
  const charArr = word.split('')
  const answerArr = answer.split('')
  const wordCheckResult: charCheck[] = []
  var result: any[] = []
  charArr.forEach((char, index) => {
    if (char === answerArr[index]) {
      wordCheckResult.push({
        char,
        status: 'right',
      })
    } else if (answerArr.includes(char)) {
      wordCheckResult.push({
        char,
        status: 'wrong',
      })
    } else {
      wordCheckResult.push({
        char,
        status: 'normal',
      })
    }
  })
  const locationCheckResult = checkLatLng(cityMap[word])
  return {
    word: wordCheckResult,
    location: locationCheckResult,
  }
}
const checkLatLng = ([lat, lng]: [number, number]) => {
  const [answerLat, answerLng] = answerCenter
  const latDiff = answerLat - lat
  const lngDiff = answerLng - lng
  enum Judge {
    'greater' = 1,
    'less' = -1,
    'equal' = 0

  }
  const latJudge: Judge = latDiff > 1 ? Judge.greater : latDiff < -1 ? Judge.less : Judge.equal
  const lngJudge: Judge = lngDiff > 1 ? Judge.greater : lngDiff < -1 ? Judge.less : Judge.equal
  if (latJudge === Judge.equal) {
    if (lngJudge === Judge.equal) {
      return '✅'
    } else if (lngJudge === Judge.greater) {
      return '➡️'
    } else {
      return '⬅️'
    }
  } else if (latJudge === Judge.greater) {
    if (lngJudge === Judge.equal) {
      return '⬆️'
    } else if (lngJudge === Judge.greater) {
      return '↗️'
    } else {
      return '↖️'
    }
  } else {
    if (lngJudge === Judge.equal) {
      return '⬇️'
    } else if (lngJudge === Judge.greater) {
      return '↘️'
    } else {
      return '↙️'
    }
  }
  return ''


}
</script>

<template>
  <h1 text-yellow-600>GameGameGameGameGameGame</h1>
  <main>
    <div text-white w-180 h-120 m="x-4 y-6">
      <Map ref="mapRef" />
    </div>
  </main>
  <input type="text" v-model="text" mt-3>
  <button @click="handleClick">Click</button>
  <div m-4>
    <div v-for="prompt in resultArr">
      <Char v-for="item in prompt.word" :char="item.char" :result="item.status"></Char>
      <p text-white text-2xl>{{ prompt.location }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
