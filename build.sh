rm -r build
tsc
cp -r ts/*.scss build
cp -r js/* build
cp -r css/* build
cp -r common/* build