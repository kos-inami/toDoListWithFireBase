
const COLORS = {
    white: "white",
    black: "#333333",
    blue: "#04B2D9",
    red: "#ef476f",
    green: "#06d6a0",
    yellow: "#ffd166",
    gray: "#eeeeee",
    orange: "#F27F3D",
}

const SIZES = {
    padding: 19,
    borderRadius: 15,
    textBoxRadius: 25,
    h1: 24,
    p: 18,
}

const FONTS = {
    h1: {fontSize: SIZES.h1, fontFamily: "Raleway-SemiBold"},
    p1: {fontSize: SIZES.p, fontFamily: "Raleway-SemiBold"},
    p2: {fontSize: SIZES.p, fontFamily: "Raleway-Regular"},
}

const SHADOW = {
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width:1, height: 8},
    shadowRadius: 12,
    shadowOpacity: 0.25,
}

export { COLORS, SIZES, FONTS, SHADOW }