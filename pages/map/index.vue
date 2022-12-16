<template>
    <div class="map">
        <div class="map__container">
            <a class="map__link"
                href="https://yandex.com.ge/maps/213/moscow/search/Wildberries/?utm_medium=mapframe&utm_source=maps">
                Wildberries в Москве
            </a>
            <AppMap></AppMap>
        </div>
    </div>
</template>

<script></script>

<style scoped>
.map {
    background: #1E1E1E;

    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;

    z-index: 10000;
}

.map__container {
    border-radius: 30px;

    padding: 16px;

    position: absolute;

    overflow: hidden;

    height: 100%;
    max-height: 710px;
    width: 100%;
    max-width: 1400px;
}

.map__link {
    color: #eee;
    font-size: 12px;
    position: absolute;
    top: 0px;
}

/* .map__iframe {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 710px;
} */
</style>