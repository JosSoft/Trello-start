const N = 10 ** 7

let persons = [
    'https: //vk.com/123123123',
    'https: //vk.com/m123nte96',
    'https: //vk.com/123121307',
    'https: //vk.com/i44423357',
    'https: //vk.com/123160568'
].map(url => ({
    counter: 0,
    url
}))

const increment = () => {
    const index = getRandom(0, persons.length - 1)
    persons[index].counter++
}

const sort = () => {
    persons = persons.sort((a, b) => b.counter - a.counter)
}

for (let i = 0; i < N; i++) {
    increment()
}
sort()

console.log(persons)

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}