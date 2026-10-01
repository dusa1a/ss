import test from 'node:test'; import assert from 'node:assert/strict';
import { aspectRatio, inspiration } from '../src/app.js';
test('cinema uses a landscape ratio',()=>assert.equal(aspectRatio('cinema'),'16:9'));
test('social video uses a vertical ratio',()=>assert.equal(aspectRatio('shorts'),'9:16'));
test('idea generator provides a cinematic prompt',()=>assert.match(inspiration,/кінематографічна/i));
