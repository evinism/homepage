import("stdfaust.lib");

process = no.pink_noise : fi.bandpass(2,100,500) <: _, _;