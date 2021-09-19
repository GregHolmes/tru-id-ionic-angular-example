package io.ionic.starter

import com.getcapacitor.BridgeActivity
import android.os.Bundle

import com.trupluginioniccapacitor.TruPluginIonicCapacitorPlugin;

class MainActivity : BridgeActivity() {
  public override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    registerPlugin(TruPluginIonicCapacitorPlugin::class.java)
  }
}
