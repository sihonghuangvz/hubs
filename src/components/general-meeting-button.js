import { isLocalHubsSceneUrl, isHubsRoomUrl, isLocalHubsAvatarUrl } from "../utils/media-url-utils";
import { guessContentType } from "../utils/media-url-utils";
import { handleExitTo2DInterstitial } from "../utils/vr-interstitial";

AFRAME.registerComponent("general-meeting-button", {
  schema: {
    onlyOpenLink: { type: "boolean" }
  },

  init() {
    this.label = this.el.querySelector("[text]");

    this.onClick = async (event) => {   
      const meetingUrl = event.target.el.getAttribute('data-meeting-url');
      const mayChangeScene = this.el.sceneEl.systems.permissions.canOrWillIfCreator("update_hub");

      const exitImmersive = async () => await handleExitTo2DInterstitial(false, () => {}, true);

      if (this.data.onlyOpenLink) {
        await exitImmersive();
        window.open(meetingUrl);
      } else if (await isLocalHubsAvatarUrl(this.src)) {
        const avatarId = new URL(this.src).pathname.split("/").pop();
        window.APP.store.update({ profile: { avatarId } });
        this.el.sceneEl.emit("avatar_updated");
      } else if ((await isLocalHubsSceneUrl(this.src)) && mayChangeScene) {
        this.el.sceneEl.emit("scene_media_selected", this.src);
      } else if (await isHubsRoomUrl(this.src)) {
        await exitImmersive();
        location.href = this.src;
      } else {
        await exitImmersive();
        window.open(this.src);
      }
    };
  },

  play() {
    this.el.object3D.addEventListener("interact", this.onClick);
  },

  pause() {
    this.el.object3D.removeEventListener("interact", this.onClick);
  }
});
