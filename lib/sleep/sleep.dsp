import("stdfaust.lib");

freq = hslider("[0]freq",500, 100, 10000,1) : si.smoo;
gain = hslider("[1]gain",1,0,1,0.01) : si.smoo;

process = no.pink_noise : 
  fi.highpass(2, freq / 5) : fi.lowpass(2, freq) : _ * gain * (1 - freq / 8000) <: _, _;