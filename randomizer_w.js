function getRandomizerByChance(...variants) {
    const values = []
    const changes = []
    let total = 0

    for (let i = 0; i < variants.length; i += 2) {
        values.push(variants[i])
        changes.push(variants[i + 1])
        total += variants[i + 1]
    }
    //console.log(values, changes, total);
    return () => {
        let random = Math.floor(Math.random() * total) + 1

        for (let i = 0; i < changes.length; i++) {
            random -= changes[i]

            if (random <= 0) {
                return values[i]
            }
        }
    }
}

const variants = {
    a: 0,
    b: 0,
    c: 0
}

const randomizer = getRandomizerByChance(
    'a', 10,
    'b', 10,
    'c', 10
)

for (let i = 0; i < 15 * 10 ** 6; i++) {
    const key = randomizer()
    variants[key]++
}

console.log(variants);