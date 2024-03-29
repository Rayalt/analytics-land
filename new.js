/* eslint-disable */
'use strict';

// Генератор файлов блока

// Использование: node new.js [имя блока] [доп. расширения через пробел]

const fs = require('fs');
const projectConfig = require('./config.js');

const dir = projectConfig.source;
const mkdirp = require('mkdirp');

const blockName = process.argv[2];
const defaultExtensions = ['scss']; // , 'img', 'bg-img' расширения по умолчанию
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3)));

// Если есть имя блока
if (blockName) {
	const dirPath = `${dir.blocks}${blockName}/`; // полный путь к создаваемой папке блока
	const made = mkdirp.sync(dirPath);
	console.log(`[NTH] Создание папки: ${made}`);
	// Обходим массив расширений и создаем файлы, если они еще не созданы
	extensions.forEach((extension) => {
		const filePath = `${dirPath + blockName}.${extension}`; // полный путь к создаваемому файлу
		let fileContent = '';                                   // будущий контент файла
		let fileCreateMsg = '';                                 // будущее сообщение в консоли при создании файла

		if (extension === 'scss') {
			fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов,\n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n// Очередность: http://nicothin.github.io/idiomatic-pre-CSS/#priority\n\n.${blockName} {\n\n\t$block-name: &; // #{$block-name}__element\n}\n`;
			// fileCreateMsg = '';
		} else if (extension === 'js') {
			fileContent = `/* global document */\n\n// const ready = require('../../js/utils/documentReady.js');\n\n// ready(function(){\n\t//\n// });\n`;
		} else if (extension === 'md') {
			fileContent = '';
		} else if (extension === 'pug') {
			fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})\n\nmixin ${blockName}(text, mods)\n\n\t//- Принимает:\n\t//- text {string} - текст\n\t//- mods {string} - список модификаторов\n\n\t//- Вызов:\n\t\t+${blockName}('Текст', 'some-mod')\n\n\t-\n\t\t// список модификаторов\n\t\tlet allMods = '';\n\t\tif(typeof(mods) !== 'undefined' && mods) {\n\t\t\tlet modsList = mods.split(',');\n\t\t\tfor (let i = 0; i < modsList.length; i++) {\n\t\t\t\tallMods = allMods + ' ${blockName}_' + modsList[i].trim();\n\t\t\t}\n\t\t}\n\n\t.${blockName}(class=allMods)&attributes(attributes)\n\t\t.${blockName}__inner\n\t\t\tblock\n`;
		} else if (extension === 'img') {
			const imgFolder = `${dirPath}img/`;
			if (fileExist(imgFolder) === false) {
				const made = mkdirp.sync(imgFolder);
				console.log(`[IDM] Создание папки: ${made}`);
			} else {
				console.log(`[IDM] Папка ${imgFolder} НЕ создана (уже существует) `);
			}
		} else if (extension === 'bg-img') {
			const imgFolder = `${dirPath}bg-img/`;
			if (fileExist(imgFolder) === false) {
				const made = mkdirp.sync(imgFolder);
				console.log(`[IDM] Создание папки: ${made}`);
			} else {
				console.log(`[IDM] Папка ${imgFolder} НЕ создана (уже существует) `);


			}
		}

		if (fileExist(filePath) === false && extension !== 'img' && extension !== 'bg-img' && extension !== 'md') {
			fs.writeFile(filePath, fileContent, (err) => {
				if (err) {
					return console.log(`[IDM] Файл НЕ создан: ${err}`);
				}
				console.log(`[IDM] Файл создан: ${filePath}`);
				if (fileCreateMsg) {
					console.warn(fileCreateMsg);
				}
			});
		} else if (extension !== 'img' && extension !== 'bg-img' && extension !== 'md') {
			console.log(`[IDM] Файл НЕ создан: ${filePath} (уже существует)`);
		} else if (extension === 'md') {
			fs.writeFile(`${dirPath}readme.md`, fileContent, (err) => {
				if (err) {
					return console.log(`[IDM] Файл НЕ создан: ${err}`);
				}
				console.log(`[IDM] Файл создан: ${dirPath}readme.md`);
				if (fileCreateMsg) {
					console.warn(fileCreateMsg);
				}
			});
		}
	});
} else {
	console.log('[NTH] Отмена операции: не указан блок');
}


function uniqueArray(arr) {
	const objectTemp = {};
	for (let i = 0; i < arr.length; i++) {
		const str = arr[i];
		objectTemp[str] = true;
	}
	return Object.keys(objectTemp);
}

function fileExist(path) {
	const fs = require('fs');
	try {
		fs.statSync(path);
	} catch (err) {
		return !(err && err.code === 'ENOENT');
	}
}
