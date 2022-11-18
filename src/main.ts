// import $ from 'jquery';
import { CheckWebGPU } from './helper';

// $('#gpu-check').html(CheckWebGPU());
document.querySelector("#gpu-check")?.append(CheckWebGPU());