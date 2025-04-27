const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './imgsRoyal';
const outputFolder = './imgsRoyalWebp';

// Функція для перевірки чи папка вже оброблена
function isFolderProcessed(outputSubfolderPath) {
    if (!fs.existsSync(outputSubfolderPath)) {
        return false;
    }
    const files = fs.readdirSync(outputSubfolderPath);
    return files.length > 0; // Якщо в папці є файли — вважаємо її обробленою
}

// Стиснення одного файлу
async function compressImage(inputFilePath, outputFilePath) {
    try {
        await sharp(inputFilePath)
            .webp({ quality: 60 })
            .toFile(outputFilePath);
        console.log(`Стиснено: ${inputFilePath} -> ${outputFilePath}`);
    } catch (err) {
        console.error(`Помилка при стисканні ${inputFilePath}:`, err.message);
    }
}

// Обробка однієї папки
async function processSubfolder(inputSubfolder, outputSubfolder) {
    if (!fs.existsSync(outputSubfolder)) {
        fs.mkdirSync(outputSubfolder, { recursive: true });
    }

    const files = fs.readdirSync(inputSubfolder, { withFileTypes: true });

    for (const file of files) {
        const inputFilePath = path.join(inputSubfolder, file.name);
        const outputFilePath = path.join(outputSubfolder, path.parse(file.name).name + '.webp');

        if (file.isFile()) {
            if (!fs.existsSync(outputFilePath)) {
                await compressImage(inputFilePath, outputFilePath);
            } else {
                console.log(`Пропущено (вже існує): ${outputFilePath}`);
            }
        }
    }
}

// Основна функція
async function main() {
    console.time('Час виконання');

    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }

    const subfolders = fs.readdirSync(inputFolder, { withFileTypes: true });

    for (const folder of subfolders) {
        const inputSubfolderPath = path.join(inputFolder, folder.name);
        const outputSubfolderPath = path.join(outputFolder, folder.name);

        if (folder.isDirectory()) {
            if (isFolderProcessed(outputSubfolderPath)) {
                console.log(`Пропущено папку (вже оброблено): ${folder.name}`);
            } else {
                console.log(`Обробка папки: ${folder.name}`);
                await processSubfolder(inputSubfolderPath, outputSubfolderPath);
            }
        }
    }

    console.timeEnd('Час виконання');
    console.log('✅ Скрипт завершено.');
}

main();
