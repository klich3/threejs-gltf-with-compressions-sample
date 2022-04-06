/*
Author: <Anthony Sychev> (hello at dm211 dot com | a.sychev at jfranc dot studio) 
Buy me a coffe: https://www.buymeacoffee.com/twooneone
init.js (c) 2022 
Created:  2022-04-07 01:16:02 
Desc: description
*/

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

//https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/GLTFLoader.js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
//HDR
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module";

import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class init {
	static instance;

	constructor(options = {}) {
		//this.fileToLoad = "static/DamagedHelmetEmmbed.gltf";
		//this.fileToLoad = "static/DamagedHelmetDraco.gltf";
		//this.fileToLoad = "static/DamagedHelmetMeshopt.gltf";
		this.fileToLoad = "static/DamagedHelmetDracoUltra.gltf";
		//this.fileToLoad = "static/DamagedHelmetKTX-etc1s.gltf";
		//this.fileToLoad = "static/DamagedHelmetKTX-uastc.gltf";

		this.targetElement = options.targetElement;

		this.config = {};

		// Width and height
		const boundings = this.targetElement.getBoundingClientRect();
		this.config.width = boundings.width || window.innerWidth;
		this.config.height = boundings.height || window.innerHeight;

		this.scene = new THREE.Scene();

		//camera
		this.camera = new THREE.PerspectiveCamera(
			25,
			this.config.width / this.config.height,
			0.1,
			150
		);
		this.camera.rotation.reorder("YXZ");
		this.camera.position.set(2, 2, 5);
		this.scene.add(this.camera);

		//render
		this.clearColor = "#cccccc";
		this.renderer = new THREE.WebGLRenderer({
			alpha: false,
			antialias: true,
		});

		this.renderer.setClearColor(this.clearColor, 1);
		this.renderer.setSize(this.config.width, this.config.height);
		this.renderer.setPixelRatio(1);

		this.context = this.renderer.getContext();

		this.targetElement.appendChild(this.renderer.domElement);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		this.renderPass = new RenderPass(this.scene, this.camera);

		const RenderTargetClass = THREE.WebGLRenderTarget;
		// const RenderTargetClass = THREE.WebGLRenderTarget
		this.renderTarget = new RenderTargetClass(
			this.config.width,
			this.config.height,
			{
				generateMipmaps: false,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBFormat,
				encoding: THREE.sRGBEncoding,
			}
		);

		this.composer = new EffectComposer(this.renderer, this.renderTarget);
		this.composer.setSize(this.config.width, this.config.height);
		this.composer.setPixelRatio(this.config.pixelRatio);

		this.composer.addPass(this.renderPass);

		//resources
		this.loadAssets();

		//lights
		const hemiLight = new THREE.HemisphereLight();
		this.scene.add(hemiLight);

		window.scene = this.scene;
		this.update();
	}

	update() {
		this.camera.updateMatrixWorld();
		this.composer.render();

		window.requestAnimationFrame(() => {
			this.update();
		});
	}

	loadAssets() {
		//NOTE: if you use loader manager add header mime type
		//loadingManager.addHandler(/\.basis$/i, basisLoader);
		//THREE.DefaultLoadingManager.addHandler( /\.basis$/, basisLoader );

		const basisLoader = new BasisTextureLoader();
		basisLoader.setTranscoderPath("static/basis/");
		basisLoader.detectSupport(this.renderer);

		/*
        basisLoader.load("static/texture.basis", (data) =>
        {
            console.log(data);
        })
        */

		// Draco
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("static/draco/");
		dracoLoader.setDecoderConfig({ type: "js" });

		/*
        dracoLoader.load(_resource.source, (_data) =>
        {
            this.fileLoadEnd(_resource, _data)

            DRACOLoader.releaseDecoderModule()
        })
        */

		// KTX2
		const ktxLoader = new KTX2Loader();
		ktxLoader.setTranscoderPath("static/basis/");

		// GLTF
		const gltfLoader = new GLTFLoader();
		gltfLoader.setCrossOrigin("anonymous");
		gltfLoader.setDRACOLoader(dracoLoader);
		gltfLoader.setKTX2Loader(ktxLoader);
		gltfLoader.setMeshoptDecoder(MeshoptDecoder);

		gltfLoader.load(this.fileToLoad, (data) => {
			this.scene.add(data.scene);
		});
	}
}
